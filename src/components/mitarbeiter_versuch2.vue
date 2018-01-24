<template>
<div class="projekte">
  <div class="container">
    <div class="row topper">
      <h3>Mitarbeiter</h3>
    </div>
    <div class="tablist" role="tablist">
      <tablistitem :key="logged_in_user.departmentid" :contentid="logged_in_user.departmentid" :contentname="logged_in_user.name" :show-edit-btn="false">
        <div class="container-flex">
          <div class="row">
            <div class="col-sm-6">
              <h4>Manager:</h4>
              <p class="card-text">{{logged_in_user.firstname}} {{logged_in_user.lastname}}</p>
              <hr />
            </div>
            <div class="col-sm-6">
              <h4>Zugewiesene Mitarbeiter:</h4>
              <ul class="userlist">
                <li class="row" v-for="user in users_of_dep">
                  <div>{{user.firstname}} {{user.lastname}}</div>
                </li>
              </ul>
            </div>
            <!--
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
                  <td v-for="time in getTimeforUser(project.id, user.id)">{{time}} Std.</td>
                </tr>
              </table>
            </div>
          -->
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
      logged_in_user: "",
      users_of_dep: [],
      users: [],
      time_array: [],
      labels: ['Januar', 'February', 'March', 'April', 'May', 'June', 'July'],
    }
  },
  methods: {
    getTimeforUser: function(userid) {
      return this.time_array[userid.toString()];
    },
    filltablewithdata: function() {

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

        var time_array_helper = [];
        for (var x = 0; x<this.users_of_dep.length; x++)  {

          console.log("------------------------------------");
          console.log(this.users_of_dep[x]);
          console.log("------------------------------------");

          this.$http.get('http://localhost:3000/api/time_by_user_date/' + this.users_of_dep[x].id + '/' + todayISO, {
            headers: {
              Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
            }
          }).then(responseA => {
            if(time_array_helper[this.users_of_dep[x].id]==null){
              time_array_helper[this.users_of_dep[x].id]=[];
            }
            time_array_helper[this.users_of_dep[x].id].push(responseA.body[0]);
          });
        }
      }
      console.log("timeArray:");
      console.log(this.time_array);
    }
  },
  created() {
    this.$http.get('http://localhost:3000/api/authenticate', {
      headers: {
        Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
      }
    }).then(response => {
      //response.body.id enthält id des angemeldeten Benutzers
      this.$http.get('http://localhost:3000/api/user/' +  response.body.id, {
        headers: {
          Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
        }
      }).then(response2 => {
        this.logged_in_user = response2.body;
        console.log(this.logged_in_user);

        this.$http.get('http://localhost:3000/api/department_users/' + this.logged_in_user.departmentid, {
          headers: {
            Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
          }
        }).then(response3 => {
          this.users_of_dep = response3.body;
          console.log("users_of_dep")
          console.log(this.users_of_dep);
          this.filltablewithdata();
        });
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
