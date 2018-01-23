<template>
<div class="mitarbeiter">
  <div class="container">
    <div class="row topper">
      <h3>Mitarbeiter</h3>
    </div>
    <div class="tablist" role="tablist">
      <tablistitem :key="logged_in_user.department" :contentid="1" :contentname="department_name" :show-edit-btn="false">
        <div class="container-flex">
          <div class="row">
            <div class="col-sm-6">
              <h4>Abteilungsleiter:</h4>
              <p class="card-text">{{logged_in_user.firstname}} {{logged_in_user.lastname}}</p>
            </div>
            <div class="col-sm-6">
              <h4>Zugewiesene Mitarbeiter:</h4>
              <ul class="userlist">
                <li class="row" v-for="user in users_of_dep">
                  <div>{{user.firstname}} {{user.lastname}}</div>
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
                <tr v-for="user in users_of_dep">
                  <td>{{user.firstname}} {{user.lastname}}</td>
                  {{getTimeforUser(user.id)}}
                  <td v-for="time in getTimeforUser(user.id)">{{time}} Std.</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </tablistitem>
      <p>
        {{this.time_array}}
      </p>
    </div>

  </div>
</div>
</template>

<script>
import tablistitem from '@/components/administration/tablistitem'
import LineExample from '@/components/LineChart.js'
export default {
  name: 'mitarbeiter',
  components: {
    tablistitem,
    LineExample
  },
  data() {
    return {
      department_name: "",
      logged_in_user: [],
      users_of_dep: [],
      projects: [],
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
    getTimeforUser: function(userid) {
      return this.time_array[userid.toString()];
    },
    filltablewithdata: function() {
      for (var j = 6; j >= 0; j--) {
        var date = moment().subtract(j, 'day')
        this.labels[6-j] = date.format("DD.MM.YYYY");

        var todayISO = date.format("YYYY-MM-DD");

        for (var i = 0; i < this.users_of_dep.length; i++) {
          var e = this.users_of_dep[i];

          //init if needed
          if (this.time_array[e.id] == null) {
            this.time_array[e.id] = [];
          }

          this.time_array[e.id].push(5);

          this.$http.get("http://localhost:3000/api/time_by_user_date/"+e.id+"/"+todayISO, {headers: {Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)}}).then((response5) => {
            this.time_array[e.id].push(response5.body.sum);
            console.log(response5.body.sum);
          });

        //   this.$http.get('' + e.id + '/' + todayISO, {
        //     headers: {
        //       Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
        //     }
        //   }).then(response => {
        //     if (this.time_array[e.id] == null) {
        //       console.log("ist null");
        //       console.log(this.time_array.toString());
        //       this.time_array[e.id.toString()] = [];
        //     }
        //     this.time_array[e.id.toString()].push(response.body.sum);
        //     console.log(this.time_array[e.id]);
        //     console.log(this.time_array.toString());
        };
      }
    }
  },
  created() {
    this.$http.get('http://localhost:3000/api/authenticate', {
      headers: {
        Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
      }
    }).then(response => {
      this.$http.get('http://localhost:3000/api/user/' +  response.body.id, {
        headers: {
          Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
        }
      }).then(response2 => {
        this.logged_in_user = response2.body;

        this.$http.get('http://localhost:3000/api/department/' + this.logged_in_user.departmentid, {
          headers: {
            Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
          }
        }).then(response3 => {

          this.department_name = response3.body.name;

          this.$http.get('http://localhost:3000/api/department_users/' + this.logged_in_user.departmentid, {
            headers: {
              Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
            }
          }).then(response4 => {
            this.users_of_dep = response4.body;
            // for (var j = 0; j < this.users_of_dep.length; j++) {
            //   this.time_array[this.users_of_dep[j].id.toString()] = [5];
            //   console.log("init");
            // }
            this.filltablewithdata();
          });
        })
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
