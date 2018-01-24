<template>
<div class="mitarbeiter">
  <div class="container">
    <div class="tablist" role="tablist">
      <div class="row">
        <div class="col-sm-12 text-center">
          <div class="header">{{department.name}}</div>
        </div>
      </div>
      <div class="row contentRow">
        <div class="col-sm-12 text-center content">
          <div class="row">
            <div class="col-sm-6">
              <h4>Manager:</h4>
              <p class="card-text">{{department.firstname}} {{department.lastname}}</p>
            </div>
            <div class="col-sm-6">
              <h4>Zugewiesene Mitarbeiter:</h4>
              <ul class="userlist">
                <li class="row" v-for="user in departmentusers">
                  <div>{{user.firstname}} {{user.lastname}}</div>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div class="row">
            <table id="arbeitszeiten">
              <tr>
                <th>Mitarbeiter</th>
                <th v-for="date in dates">{{date.format("DD.MM.YYYY")}}</th>
              </tr>
              <tr v-for="user in departmentusers">
                <td>{{user.firstname}} {{user.lastname}}</td>
                <td v-for="time in getTimeforUser(user.id)">{{time}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import tablistitem from '@/components/administration/tablistitem'
export default {
  name: 'mitarbeiter',
  components: {
    tablistitem
  },
  data() {
    return {
      userid: Number,
      department: Object,
      departmentusers: [],
      dates: [],
      times: []
    }
  },
  methods: {
    getTimeforUser(id) {
      var idStr = id;
      if (typeof idStr == "string") {
        idStr = id.toString();
      }

      return this.times[id] || []
    },
    requestUserTimes() {

      this.times = {};
      for (var i = 0; i < this.departmentusers.length; i++) {
        //init sub object for user
        var userId = this.departmentusers[i].id;
        this.times[userId] = {};

        //go through all dates
        for (var j = 0; j < this.dates.length; j++) {
          var date = this.dates[j].format("YYYY-MM-DD");
          this.times[userId][date] = 0;
          this.$http.get('http://localhost:3000/api/time_worked_day/' + userId + '/' + date, {headers: {Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)}}).then(res => {
            var id = res.url.replace("http://localhost:3000/api/time_worked_day/","").replace(/\/[0-9]{4}-[0-9]{2}-[0-9]{2}/i,"");
            var date = res.url.replace("http://localhost:3000/api/time_worked_day/","").replace(/[0-9]*\//i,"");
            this.times[id][date] = res.body.sumFormatted;
            this.$mount();
          });
        }
      }
    }
  },
  created() {

    //dates
    for (var i = 6; i >= 0; i--) {
      this.dates.push(moment().subtract(i,"day"));
    }

    this.$http.get('http://localhost:3000/api/authenticate', {headers: {Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.userid = response.body.id;
      this.$http.get('http://localhost:3000/api/user/'+this.userid, {headers: {Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)}}).then(response2 => {
        //get department info
        this.$http.get('http://localhost:3000/api/department/'+response2.body.departmentid, {headers: {Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)}}).then(response3 => {
          this.department = response3.body;
        });

        //get department users
        this.$http.get('http://localhost:3000/api/department_users/'+response2.body.departmentid, {headers: {Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)}}).then(response3 => {
          this.departmentusers = response3.body;
          this.requestUserTimes();
        });
      });
    });

  }
}
</script>

<style scoped>
.mitarbeiter {
  min-height: 100vh;
  width: 100%;
}

.col-sm-12 {
  padding: 0px;
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
.header {
  text-align: left;
  background-color: #003452;
  padding: 20px;
  border: none;
  font-size: 18px;
  color: white;
  -webkit-box-shadow: 0px 0px 7px #ccc;
  box-shadow: 0px 0px 7px #ccc;
}

.content {
  border-radius: 0px 0px 3px 3px;
  box-shadow: 0px 5px 7px #ccc;
  padding: 20px;
  text-align: left;
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
