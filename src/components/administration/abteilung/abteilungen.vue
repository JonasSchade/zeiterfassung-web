<template>
  <div class="abteilungen">
      <div class="container">
        <div class="row topper">
          <div class="col-sm-4 text-left">
            <button v-on:click="$router.push('/administration/')">
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
              Administration
            </button>
          </div>
          <div class="col-sm-4">
            <h3>Abteilungen</h3>
          </div>
          <div class="col-sm-4 text-right">
            <button id="btn_new_project" v-on:click="$router.push('/administration/neueAbteilung')">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Neue Abteilung
             </button>
           </div>
        </div>

        <div class="tablist" role="tablist">
          <tablistitem v-for="abteilung in abteilungen" :key="abteilung.id" :contentid="abteilung.id" :contentname="abteilung.name">
            <p class="card-text">
              Abteilungsleiter: {{abteilung.manager}}
            </p>
            <p>Mitarbeiter:</p>
            <ul>
              <li v-for="user in getUsers(abteilung.id)">
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
  name: 'abteilungen',
  components: {tablistitem},
  methods: {

  },
  data: function() {
    return {
     abteilungen: [],
     users: [],
     allusers: []
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/department', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.abteilungen = response.body;

      for (var i = 0; i < this.abteilungen.length; i++) {
        this.$http.get('http://localhost:3000/api/user_department/'+this.abteilungen[i].id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          var id = response.url.replace("http://localhost:3000/api/user_department/","");
          this.users[id.toString()] = response.body;
        });
      }

    });
    this.$http.get('http://localhost:3000/api/user', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.allusers = response.body;
    });

  },
  methods: {
    getUsers: function(id){
      return this.users[id.toString()];
    },
    getManagerName(id){
      return this.allusers[id.toString()];
    }
  }
}
</script>

<style scoped>
.abteilungen {
  min-height: 100vh;
  text-align: center;
}


#btn_neue_abteilung {
  margin: 20px;
}

.abteilung_box {
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  padding-left: 0px;
  padding-right: 0px;
  padding: 20px;
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

.topper div[class^="col-sm"] {
  padding: 0px;
}
</style>
