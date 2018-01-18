<template>
<div class="mitarbeiter">
  <div class="container">

    <div class="row topper">
      <div class="col-sm-4 text-left">
        <button v-on:click="$router.push('/administration/')">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          Administration
        </button>
      </div>
      <div class="col-sm-4">
        <h3>Mitarbeiter</h3>
      </div>
      <div class="col-sm-4 text-right">
        <button id="btn_new_project" v-on:click="$router.push('mitarbeiter/new')">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Neuer Mitarbeiter
         </button>
       </div>
    </div>

    <div class="tablist" role="tablist">
      <tablistitem v-for="employee in employees" :key="employee.id" :contentid="employee.id" :contentname="employee.firstname+' '+employee.lastname">
        <p class="card-text">
          {{ employee.firstname }} {{ employee.lastname }}
        </p>
        <p class="card-text">
          Abteilung: {{ employee.departmentid }}
        </p>
        <p class="card-text">
          Username: {{ employee.username }}
        </p>
        <p>Projekte:</p>
        <ul>
          <li v-for="project in getProjects(employee.id)">
            {{ project.name }}
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
  name: 'mitarbeiter',
  components: { tablistitem },
  data() {
    return {
      employees: [],
      projects: JSON,
    };
  },
  methods:{
    getUsers: function(id) {
      return this.users[id.toString()];
    },
    getProjects: function(id) {
      return this.projects[id.toString()];
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/user', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.employees = response.body;

      for (var i = 0; i < this.employees.length; i++) {
        this.$http.get('http://localhost:3000/api/user_project/'+this.employees[i].id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          var id = response.url.replace("http://localhost:3000/api/user_project/","");
          this.projects[id.toString()] = response.body;
        });
      }
    });
  }
}
</script>

<style scoped>
.mitarbeiter {
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
