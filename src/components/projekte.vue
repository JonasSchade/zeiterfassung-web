<template>
<div class="projekte">
  <div class="container">

    <div class="tablist" role="tablist">
      <tablistitem v-for="project in projects" :key="project.id" :contentid="project.id" :contentname="project.name">
        <div class="container-flex">
          <div class="row">
            <div class="col-sm-6">
              <h4>Manager:</h4>
              <p class="card-text">{{project.firstname}} {{project.lastname}}</p>
            </div>
            <div class="col-sm-6">
              <h4>Beschreibung:</h4>
              <p class="card-text">{{ project.description }}</p>
            </div>
          </div>
            <hr/>
          <div class="row">
            <div class="col-xs-4">
              <h4>Zugewiesene Mitarbeiter:</h4>
              <ul class="userlist">
                <li class="row" v-for="user in getUsers(project.id)">
                  <div v-on:click="clickuser(project.id, user.id)">{{user.firstname}} {{user.lastname}}</div>
                  <span>{{clickeduser.firstname}}</span>
                </li>
              </ul>
            </div>
            <div class="col-xs-8">
              <div>
                <LineExample :labels="labels" :datasets="datasets">
                </LineExample>
              </div>
            </div>
          </div>
        </div>
      </tablistitem>
      <LineExample id="time_chart" :labels="labels" :datasets="datasets">
      </LineExample>
    </div>

  </div>
</div>
</template>

<script>
import tablistitem from '@/components/administration/tablistitem'
import LineExample from '@/components/LineChart.js'
export default {
  name: 'projekte',
  components: {tablistitem, LineExample},
  data() {
    return {
      benutzer: "",
      userId: "",
      users: [],
      projects: [],
      clickeduser: "",
      time_array: [],
      labels:['Januar', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets:[{
        label: 'Data One',
        borderColor: '#FC2525',
        data: [40, 39, 10, 40, 39, 80, 40]
      }]
    }
  },
  methods: {
    getUsers: function(id){
      return this.users[id.toString()];
    },
    //WICHTIG! Wird im Moment nur aufgerufen bei Projekt "Datenbank" bei KLick auf Timm Werner
    fillChartwithData: function(projectid, userid){
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      var today = new Date();
      this.labels[6] = today.toLocaleString('de-DE', options);
      for(var j = 5; j>=0; j--){
        today.setDate(today.getDate() - 1);
        this.labels[j] = today.toLocaleString('de-DE', options);

        //parse today into the dateformat the api reqires
        var month = ("0" + (today.getMonth() + 1)).slice(-2); // month (in integer 0-11)
        var year = today.getFullYear();
        var day = today.getUTCDate();
        var todayISO = year+'-'+month+'-'+day

        this.$http.get('http://localhost:3000/api/project_time/'+userid+'/'+todayISO+'/'+projectid, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          this.time_array[0] = response.body[0].duration;
          console.log(response.body[0].duration);
          console.log(response.body[0].name);
        });
      }
      console.log("Labels: "+this.labels)
      console.log("Time_array: "+this.time_array)
      var dataset = {
        label: userid,
        borderColor: 'green',
        data: this.time_array
      }
      this.datasets.push(dataset);
    //  this.addData($('#time_chart'),this.labels, time_array);
      console.log("datasets: "+this.datasets)


    },
    clickuser: function(projectid, userid){
      var array = this.users[projectid];
      for (var i = 0; i<array.length; i++){
        if(array[i].id==userid){
          this.clickeduser = array[i];
        }
      }
      this.fillChartwithData(projectid, userid);
    },
    // addData: function(chart, label, data) {
    // chart.data.labels.push(label);
    // chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(data);
    // });
    // chart.update();
    // }
  },
  created() {
    this.$http.get('http://localhost:3000/api/authenticate', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.benutzer = response.body.username;
      this.userId = response.body.id;

      this.$http.get('http://localhost:3000/api/projects_of_manager/'+this.userId, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
        this.projects = response.body;
        for (var i = 0; i < this.projects.length; i++) {
          this.$http.get('http://localhost:3000/api/project_users/'+this.projects[i].id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
            var id = response.url.replace("http://localhost:3000/api/project_users/","");
            this.users[id.toString()] = response.body;
          });
        }
      });
    });
    //this.fillChartwithData();
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
</style>
