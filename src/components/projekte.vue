<template>
<div class="projekte">
  <div class="container">
    <div class="row topper">
      <h3>Projekte</h3>
    </div>
    <div class="tablist" role="tablist">
      <tablistitem v-for="project in projects" :key="project.id" :contentid="project.id" :contentname="project.name" :show-edit-btn="false">
        <div class="container-flex">
          <div class="row">
            <div class="col-sm-6">
              <h4>Manager:</h4>
              <p class="card-text">{{project.firstname}} {{project.lastname}}</p>
              <hr />
              <h4>Beschreibung:</h4>
              <p class="card-text">{{ project.description }}</p>
            </div>
            <div class="col-sm-6">
              <h4>Zugewiesene Mitarbeiter:</h4>
              <ul class="userlist">
                <li class="row" v-for="user in getUsers(project.id)">
                  <div v-on:click="clickuser(project.id, user.id)">{{user.firstname}} {{user.lastname}}</div>
                  <span>{{clickeduser.firstname}}</span>
                </li>
              </ul>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div style="overflow-x: scroll">
              <table id="arbeitszeiten">
                <tr>
                  <th>Mitarbeiter</th>
                  <th v-for="day in labels">{{day}}</th>
                </tr>
                <tr v-for="user in getUsers(project.id)">
                  <td>{{user.firstname}} {{user.lastname}}</td>
                  <td v-for="time in getTimeforUser(project.id, user.id)">{{time.dur}} Std.</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </tablistitem>
    </div>

  </div>
</div>
</template>

<script>
import tablistitem from '@/components/administration/tablistitem'
import LineExample from '@/components/LineChart.js'
export default {
  name: 'projekte',
  components: {
    tablistitem,
    LineExample
  },
  data() {
    return {
      benutzer: "",
      userId: "",
      users: [],
      projects: [],
      clickeduser: "",
      time_array: [],
      labels: ['Januar', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Data One',
        borderColor: '#FC2525',
        data: [40, 39, 10, 40, 39, 80, 40]
      }]
    }
  },
  methods: {
    getUsers: function(id) {
      return this.users[id.toString()];
    },
    getTimeforUser: function(projectid, userid) {
      return this.time_array[projectid.toString()][userid.toString()];
    },
    clickuser: function(projectid, userid) {
      var array = this.users[projectid];
      for (var i = 0; i < array.length; i++) {
        if (array[i].id == userid) {
          this.clickeduser = array[i];
        }
      }
    },
    fillchartwithdata: function(projectid) {
      var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      };
      var today = new Date();
      for (var j = 6; j >= 0; j--) {
        if (j == 6) {
          this.labels[6] = today.toLocaleString('de-DE', options);
        } else {
          today.setDate(today.getDate() - 1);
          this.labels[j] = today.toLocaleString('de-DE', options);
        }

        //parse today into the dateformat the api reqires
        var month = ("0" + (today.getMonth() + 1)).slice(-2); // month (in integer 0-11)
        var year = today.getFullYear();
        var day = today.getUTCDate();
        var todayISO = year + '-' + month + '-' + day

        this.getUsers(projectid).forEach((e) => {
          this.$http.get('http://localhost:3000/api/project_time/' + e.id + '/' + todayISO + '/' + projectid, {
            headers: {
              Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
            }
          }).then(response => {
            this.time_array[projectid][e.id].push({
              dur: response.body[0].duration,
              name: response.body[0].userid
            });
          });
        });
      }
    }
  },
  created() {
    this.$http.get('http://localhost:3000/api/authenticate', {
      headers: {
        Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
      }
    }).then(response => {
      this.benutzer = response.body.username;
      this.userId = response.body.id;

      this.$http.get('http://localhost:3000/api/projects_of_manager/' + this.userId, {
        headers: {
          Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
        }
      }).then(response => {
        this.projects = response.body;
        for (var i = 0; i < this.projects.length; i++) {
          this.$http.get('http://localhost:3000/api/project_users/' + this.projects[i].id, {
            headers: {
              Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
            }
          }).then(response => {
            var id = response.url.replace("http://localhost:3000/api/project_users/", "");
            this.users[id.toString()] = response.body;
            for (var j = 0; j < response.body.length; j++) {
              if (this.time_array[id] == null) {
                this.time_array[id] = [];
              }
              this.time_array[id][response.body[j].id] = [];
            }
            this.fillchartwithdata(id);
          });
        }
      });
    });
  }
}
</script>

<style scoped>
.projekte {
  min-height: 100vh;
  text-align: center;
  width: 100%;
}

.topper {
  margin-bottom: 20px;
}

.topper h3 {
  margin-bottom: 5px;
  margin-top: 5px;
}

.container {
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  margin-bottom: 30px;
  padding-left: 5px;
  padding-right: 5px;
}

.userlist {
  list-style-type: none;
  padding: 0px;
  max-height: 200px;
  overflow-y: scroll;
}

.userlist li {
  width: 100%;
}

.topper div[class^="col-sm"] {
  padding: 0px;
}

.userlist .row {
  padding: 0px;
  margin: 0px;
  margin-bottom: 10px;
}

#arbeitszeiten {
  width: 100%;
}

tr {
  background-color: #f2f4f7;
  padding: 10px;
  border-bottom: 1px solid white;
}

td {
  padding: 10px;
}

th {
  background-color: #003452;
  color: white;
  border-radius: 3px 3px 0px 0px;
  padding: 10px;
}
</style>
