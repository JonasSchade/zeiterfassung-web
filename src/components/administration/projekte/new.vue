<template>
<div class="newproject">
  <div class="container">
    <div class="topper">
      <div class="row">
        <div class="col-sm-12">
          <h3>Neues Projekt</h3>
        </div>
      </div>
    </div>

    <form class="container-flex">
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Name:</label>
        <div class="col-sm-9">
          <input pattern="[A-Za-z \-äÄöÖüÜß]{2,}" maxlength="40" type="text" v-model="name" class="full-width" />
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Beschreibung:</label>
        <div class="col-sm-9">
          <textarea maxlength="160" cols="40" rows="5" v-model="description" class="full-width"></textarea>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Zugewiesene Mitarbeiter:</label>
        <select class="col-sm-6" id="addLinkedUserSelect">
          <option v-for="user in allMinusLinkedUsers()" :value="user.id">{{user.firstname}} {{user.lastname}}</option>
        </select>
        <div class="col-sm-3">
          <button  type="button" class="full-width" v-on:click="addLinkedUser($event)">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Hinzufügen
          </button>
        </div>
      </div>
      <div class="row" v-if="linkedusers.length > 0">
        <div id="linkedusers" class="col-sm-6 col-sm-offset-3">
          <ul class="container-flex">
            <li class="row" v-for="user in linkedusers">
              <div class="col-xs-10">{{user.firstname}} {{user.lastname}}</div>
              <div class="col-xs-2">
                <i class="fa fa-minus" aria-hidden="true" :value="user.id" v-on:click="removedLinkedUser(user.id)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Projektleiter:</label>
        <div class="col-sm-9">
          <select name="manager" class="full-width" v-on:change="updateManager($event)" id="managerSelect">
            <option value="" disabled hidden selected>Aus zugewiesenen Mitarbeitern wählen</option>
            <option v-for="user in linkedusers" :value="user.id">{{user.firstname}} {{user.lastname}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-offset-3 col-sm-9 text-right">
            <button v-on:click="$router.push('/administration/projekte')" type="button" style="margin-right:10px;">
              <i class="fa fa-times" aria-hidden="true"></i>
              Abbrechen
            </button>
            <button :disabled='!isComplete' type="button" v-on:click="sendHTTP()">
              <i class="fa fa-check" aria-hidden="true"></i>
              Bestätigen
            </button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'newproject',
  data() {
    return {
      name: "",
      description: "",
      manager: {},
      allusers: [],
      linkedusers: [],
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/user', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.allusers = response.body;

      this.manager = {};
    });
  },
  methods: {
    //find a object (user) with given id in given array
    findById(arr, id) {
      for(var i = 0; i < arr.length; i++)
      {
        if(arr[i].id == id)
        {
          return i;
        };
      };
      return null;
    },
    addLinkedUser() {

      var selectedUser = $("#addLinkedUserSelect")[0];

      if (selectedUser.options.length == 0) {
        return 0;
      }

      selectedUser = selectedUser.options[selectedUser.selectedIndex].value;

      if (selectedUser == -1) {
        return;
      }

      //find user with selected id in allusers
      var index = this.findById(this.allusers, selectedUser);

      this.linkedusers.push(this.allusers[index]);

      if (this.linkedusers.length == 1) {
        $("#managerSelect")[0].selectedIndex = 1;
        this.manager = this.linkedusers[0];
      }
    },
    removedLinkedUser(id) {
      var index = this.findById(this.linkedusers, id);

      //we have to make sure the moving doesn't fuck it all up
      //removing a linkedUser -> array shifts but selectedIndex stays same -> option one above current will be selected
      var selIndex = $('#managerSelect')[0].selectedIndex;
      if (index < selIndex - 1) {
        $('#managerSelect')[0].selectedIndex = selIndex - 1;
      };

      this.linkedusers.splice(index,1);
      if (this.linkedusers.length == 0) {
        $("#managerSelect")[0].selectedIndex = 0;
      }
    },
    updateManager() {
      var index = this.findById(this.linkedusers, $("#managerSelect")[0].options[$("#managerSelect")[0].selectedIndex].value);

      this.manager = this.linkedusers[index];
    },
    sendHTTP() {

      //create json object
      var bodyobj = {
        name: this.name,
        description: this.description,
        manager: this.manager.id,
      };

      //POST Request to add project
      this.$http.post("http://localhost:3000/api/project", bodyobj, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {

        //POST Request to add linked users to newly created project
        this.$http.post("http://localhost:3000/api/project_users/"+response.body.id, this.linkedusers, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          //go back to projects
          this.$router.push('/administration/projekte');
        }).catch((err) => {console.log(err);});
      }).catch((err) => {console.log(err);});


    },
    allMinusLinkedUsers() {
      var a = this.allusers;
      var l = this.linkedusers;

      return a.filter(au => (
        l.filter(lu => (lu.id == au.id)).length == 0
      ));
    }
  },
  computed: {
  isComplete () {
    return this.name && this.manager && this.description && this.linkedusers.length>0;
  },
}
}
</script>

<style scoped>
  .newproject {
    width: 100%;
    min-height: 100vh;
    text-align: center;
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

  p {
    padding-bottom: 50px;
    display: block;
  }

  .container-flex .row {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .container-flex label {
    margin: 0px;
  }

  #linkedusers {
    padding: 0px;
  }

  #linkedusers ul {
    list-style-type: none;
    padding: 0px;
    max-height: 200px;
    overflow-y: scroll;
  }

  #linkedusers ul li {
    width: 100%;
  }

  #linkedusers ul .row {
    padding: 0px;
    margin: 0px;
    margin-bottom: 10px;
  }
</style>
