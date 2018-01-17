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
          <input name="name" type="text" v-model="name" class="full-width" />
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Beschreibung:</label>
        <div class="col-sm-9">
          <textarea name="description" v-model="description" class="full-width" rows="5"></textarea>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Manager:</label>
        <div class="col-sm-9">
          <select name="manager" class="full-width" v-on:change="updateManager($event)">
            <option v-for="user in allusers" :value="user.id">{{user.firstname}} {{user.lastname}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Zugewiesene Mitarbeiter:</label>
        <select class="col-sm-6" id="addLinkedUserSelect">
          <option v-for="user in allusers.filter(user => (!(linkedusers.includes(user)) && (user != manager)))" :value="user.id">{{user.firstname}} {{user.lastname}}</option>
        </select>
        <div class="col-sm-3">
          <button  type="button" class="full-width" v-on:click="addLinkedUser($event)">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Hinzufügen
          </button>
        </div>
      </div>
      <div class="row">
        <div id="linkedusers" class="col-sm-6 col-sm-offset-3">
          <ul class="container-flex">
            <li class="row" v-for="user in linkedusers">
              <div class="col-xs-10">{{user.firstname}} {{user.lastname}}</div>
              <div class="col-xs-2">
                <i class="fa fa-minus" aria-hidden="true" :value="user.id" v-on:click="removedLinkedUser($event)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6">
            <button v-on:click="$router.push('/administration/projekte')" class="warning" type="button">
              <i class="fa fa-times" aria-hidden="true"></i>
              Abbrechen
            </button>
        </div>
        <div class="col-xs-6">
          <button type="button" v-on:click="sendHTTP()">
            <i class="fa fa-check" aria-hidden="true"></i>
            Hinzufügen
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

      this.manager = this.allusers[0];
    });
  },
  methods: {
    //find a object (user) with given id in given array
    findById: function(arr, id) {
      for(var i = 0; i < arr.length; i++)
      {
        if(arr[i].id == id)
        {
          return i;
        };
      };
      return null;
    },
    addLinkedUser: function(el) {

      var selectedUser = $("#addLinkedUserSelect")[0];
      selectedUser = selectedUser.options[selectedUser.selectedIndex].value;

      if (selectedUser == -1) {
        return;
      }

      //find user with selected id in allusers
      var index = this.findById(this.allusers, selectedUser);

      this.linkedusers.push(this.allusers[index]);
    },
    removedLinkedUser: function(el) {
      var index = this.findById(this.linkedusers, el.srcElement.getAttribute("value"));

      this.linkedusers.splice(index,1);
    },
    updateManager: function(el) {
      var index = this.findById(this.allusers, el.srcElement.options[el.srcElement.selectedIndex].value);

      this.manager = this.allusers[index];

      //remove new manager from linked users
      var luIndex = this.findById(this.linkedusers, this.manager.id);
      if (luIndex != -1) {

        this.linkedusers.splice(luIndex,1);
      }
    },
    sendHTTP: function() {

      //Make sure all inputs are valid
      if(! this.validate()) {
        return;
      }

      //create json object
      var bodyobj = {
        name: this.name,
        description: this.description,
        manager: this.manager.id,
      };

      //POST Request to add project
      this.$http.post("http://localhost:3000/api/project", bodyobj, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {

        //POST Request to add linked users to newly created project TODO
        this.$http.post("http://localhost:3000/api/project_users/"+response.body.id, this.linkedusers, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          //go back to projects
          this.$router.push('/administration/projekte');
        }).catch((err) => {console.log(err);});
      }).catch((err) => {console.log(err);});


    },
    validate: function() {
      var name = this.name;
      var desc = this.description;

      if (name == "") {
        alert("Bitte Namen eingeben!");
        return false;
      }
      if (desc == "") {
        alert("Bitte Beschreibung eingeben!");
        return false;
      }
      if (name.length < 5) {
        alert("Der Name muss aus mindestens fünf Buchstaben bestehen.");
        return false;
      }
      if (desc.length < 5) {
        alert("Die Beschreibung muss aus mindestens fünf Buchstaben bestehen.");
        return false;
      }

      return true;
    }
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
/*
  *[class^="col-sm-"] {
    padding-left: 10px;
    padding-right: 10px;
  }
*/
  #linkedusers {
    padding: 0px;
  }
  #linkedusers ul {
    list-style-type: none;
    padding: 0px;
    max-height: 200px;
    overflow-y: scroll;
  }

  li {
    width: 100%;
  }

  #linkedusers ul .row {
    padding: 0px;
    margin: 0px;
    margin-bottom: 10px;
  }
/*
  .container-flex input, .container-flex button, .container-flex select {
    margin: 10px;
  }
  */
</style>
