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
        <button v-on:click="$router.push('mitarbeiter/new')">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Neuer Mitarbeiter
         </button>
       </div>
    </div>

    <div class="tablist" role="tablist">
      <tablistitem v-for="employee in employees" :key="employee.id" :contentid="employee.id" :contentname="employee.firstname+' '+employee.lastname">
        <div class="container-flex">
          <div class="row">
            <div class="col-sm-6">
              <h4>Abteilung:</h4>
              <p class="card-text">{{ employee.name }}</p>
              <hr/>
              <h4>Username:</h4>
              <p class="card-text">{{ employee.username }}</p>
            </div>
            <div class="col-sm-6">
              <hr class="hidden-sm hidden-md hidden-lg hidden-xl"/>
              <h4>Zugewiesene Projekte:</h4>
              <ul class="userlist">
                <li class="row" v-if="getProjects(employee.id).length == 0">
                  <div class="col-xs-12">Keinen Projekte zugeordnet</div>
                </li>
                <li class="row" v-for="project in getProjects(employee.id)">
                  <div class="col-xs-12">{{ project.name }}</div>
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
  name: 'mitarbeiter',
  components: { tablistitem },
  data() {
    return {
      employees: [],
      projects: JSON,
    };
  },
  methods:{
    getUsers(id) {
      return this.users[id.toString()] || [];
    },
    getProjects(id) {
      return this.projects[id.toString()] || [];
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/user', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.employees = response.body;
      for (var i = 0; i < this.employees.length; i++) {
        this.$http.get('http://localhost:3000/api/user_projects/'+this.employees[i].id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          var id = response.url.replace("http://localhost:3000/api/user_projects/","");
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
