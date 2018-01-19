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
            <hr class="hidden-sm hidden-md hidden-lg hidden-xl"/>
            <h4>Zugewiesene Mitarbeiter:</h4>
            <ul class="userlist">
              <li class="row" v-for="user in getUsers(project.id)">
                <div class="col-xs-12">{{user.firstname}} {{user.lastname}}</div>
                <LineExample :labels="labels" :datasets="datasets">
                </LineExample>
              </li>
            </ul>
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
  components: {tablistitem, LineExample},
  data() {
    return {
      benutzer: "",
      userId: "",
      users: [],
      projects: [],
      labels:['Januar', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets:[{
        label: 'Data One',
        backgroundColor: '#FC2525',
        data: [40, 39, 10, 40, 39, 80, 40]
      },{
        label: 'Data Two',
        backgroundColor: '#05CBE1',
        data: [60, 55, 32, 10, 2, 12, 53]
      }],
      data: []
    }
  },
  methods: {
    getUsers: function(id){
      return this.users[id.toString()];
    },
    fillChartwithData: function(){

    }
  },
  created() {
    this.$http.get('http://localhost:3000/api/authenticate', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.benutzer = response.body.username;
      this.userId = response.body.id;
      console.log(this.userId);

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
    this.fillChartwithData();
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
