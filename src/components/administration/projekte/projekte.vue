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
        <p class="card-text">
          {{ project.manager }}
        </p>
        <p class="card-text">
          {{ project.description }}
        </p>
        <p>Beteiligte Mitarbeiter:</p>
        <ul>
          <li v-for="user in getUsers(project.id)">
            {{ user.firstname }} {{user.lastname}}
          </li>
        </ul>
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
      users: [JSON]
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

</style>
