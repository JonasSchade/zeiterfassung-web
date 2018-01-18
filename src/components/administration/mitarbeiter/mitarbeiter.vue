<template>
  <div class="mitarbeiter">
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
              <h3>Mitarbeiter</h3>
            </div>
            <div class="col-sm-4 text-right">
              <button id="btn_new_project" v-on:click="$router.push('/administration/neuermitarbeiter')">
                <i class="fa fa-plus" aria-hidden="true"></i>
                Neuer Mitarbeiter
               </button>
             </div>
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
      projects: [JSON]
    }
},
methods:{
  filterItems: function(items) {
    return items.filter(function(item) {
      return item.price > 10;
    })
  },
  getProjects: function(id){
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
  }

  #btn_neuer_mitarbeiter {
    margin: 20px;
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

  .topper {
    margin-bottom: 20px;
  }

  .topper h3 {
    margin-bottom: 5px;
    margin-top: 5px;
  }
</style>
