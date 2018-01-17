<template>
<div class="projekte">
  <div class="container">

    <div class="topper">
      <div class="row">
        <div class="col-sm-4 text-left">
          <button v-on:click="$router.push('/administration/')">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            Administration
          </button>
        </div>
        <div class="col-sm-4">
          <h3>Projekte</h3>
        </div>
        <div class="col-sm-4 text-right">
          <button id="btn_new_project" v-on:click="$router.push('projekte/new')">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Neues Projekt
           </button>
         </div>
      </div>
    </div>

    <div class="tablist" role="tablist">
      <tablistitem v-for="project in projects" :key="project.id" :contentid="project.id" :contentname="project.name">
        <div class="conatiner-flex">
          <div class="row">
            <div class="col-sm-6">
              <h4>Manager:</h4>
              <p class="card-text">{{ project.firstname }} {{ project.lastname }}</p>
              <hr/>
              <h4>Beschreibung:</h4>
              <p class="card-text">{{ project.description }}</p>
            </div>
            <div class="col-sm-6">
              <hr class="hidden-sm hidden-md hidden-lg hidden-xl"/>
              <h4>Zugewiesene Mitarbeiter:</h4>
              <ul class="userlist">
                <li class="row" v-for="user in getUsers(project.id)">
                  <div class="col-xs-12">{{user.firstname}} {{user.lastname}}</div>
                </li>
              </ul>
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

export default {
  name: 'projekte',
  components: { tablistitem },
  data() {
    return {
      projects: [],
      users: JSON
    }
  },
  methods:{
    getUsers: function(id){
      return this.users[id.toString()];
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/project', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.projects = response.body;
      for (var i = 0; i < this.projects.length; i++) {
        this.$http.get('http://localhost:3000/api/project_users/'+this.projects[i].id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          var id = response.url.replace("http://localhost:3000/api/project_users/","");
          this.users[id.toString()] = response.body;
        });
      }
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

.userlist .row {
  padding: 0px;
  margin: 0px;
  margin-bottom: 10px;
}
</style>
