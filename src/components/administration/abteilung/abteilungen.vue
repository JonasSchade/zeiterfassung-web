<template>
<div class="abteilungen">
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
          <h3>Abteilungen</h3>
        </div>
        <div class="col-sm-4 text-right">
          <button id="btn_new_project" v-on:click="$router.push('/administration/neueAbteilung')">
                <i class="fa fa-plus" aria-hidden="true"></i>
                Neue Abteilung
               </button>
        </div>
      </div>
    </div>

    <div class="tablist" role="tablist">
      <tablistitem v-for="abteilung in abteilungen" :key="abteilung.id" :contentid="abteilung.id" :contentname="abteilung.name">
        <div class="row">
            <div class="col-sm-6">
              <h4 class="card-text">
                Abteilungsleiter:
              </h4>
              {{abteilung.firstname}} {{abteilung.lastname}}
            </div>
              <div class="col-sm-6">
                <h4>Zugewiesene Mitarbeiter:</h4>
                <ul class="userlist">
                  <li v-for="user in getUsers(abteilung.id)">
                    {{ user.firstname }} {{user.lastname}}
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
export default {
  name: 'abteilungen',
  components: {
    tablistitem
  },
  methods: {

  },
  data: function() {
    return {
      abteilungen: [],
      users: []
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/department', {
      headers: {
        Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
      }
    }).then(response => {
      this.abteilungen = response.body;

      for (var i = 0; i < this.abteilungen.length; i++) {
        this.$http.get('http://localhost:3000/api/user_department/' + this.abteilungen[i].id, {
          headers: {
            Authorization: ('bearer ' + window.sessionStorage.chronosAuthToken)
          }
        }).then(response => {
          var id = response.url.replace("http://localhost:3000/api/user_department/", "");
          this.users[id.toString()] = response.body;
        });
      }

    });

  },
  methods: {
    getUsers: function(id) {
      return this.users[id.toString()];
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

.userlist {
  list-style-type: none;
  padding: 0px;
  max-height: 200px;
  overflow-y: scroll;
}
</style>
