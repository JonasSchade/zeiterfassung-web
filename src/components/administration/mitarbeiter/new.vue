<template>
<div class="newemployee">
  <div class="container">
    <div class="topper">
      <div class="row">
        <div class="col-sm-12">
          <h3>Neuer Mitarbeiter</h3>
        </div>
      </div>
    </div>

    <form class="container-flex">
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Vorname:</label>
        <div class="col-sm-9">
          <input pattern="[A-Za-z -äÄöÖüÜß]{2,}" maxlength="40" type="text" v-model="firstname" class="full-width" />
        </div>
      </div>
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Nachname:</label>
        <div class="col-sm-9">
          <input pattern="([A-Za-z -äÄöÖüÜß]{2,}" maxlength="40" type="text" v-model="lastname" class="full-width" />
        </div>
      </div>
      <hr/>
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Username:</label>
        <div class="col-sm-9">
          <input pattern="([A-Za-z0-9]|-){5,}" maxlength="40" type="text" v-model="username" class="full-width" />
        </div>
      </div>
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Passwort:</label>
        <div class="col-sm-9">
          <input pattern=".{3,}" maxlength="40" type="password" v-model="password" class="full-width" />
        </div>
      </div>
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Passwort wiederholen:</label>
        <div class="col-sm-9">
          <input pattern=".{3,}" maxlength="40" type="password" v-model="password_repeat" class="full-width" />
        </div>
      </div>
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Administrator:</label>
        <div class="col-sm-9 text-left hidden-xs">
          <input maxlength="40" type="checkbox" v-model="administrator" />
        </div>
        <div class="col-sm-9 hidden-sm hidden-md hidden-lg hidden-xl">
          <input maxlength="40" type="checkbox" v-model="administrator" />
        </div>
      </div>
      <hr/>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Abteilung:</label>
        <div class="col-sm-9">
          <select name="manager" class="full-width" v-on:change="" v-model="department">
            <option value="-1">Keine Abteilung</option>
            <option v-for="d in alldepartments" :value="d.id">{{d.name}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Projekte:</label>
        <select class="col-sm-6" id="addLinkedProjectSelect">
          <option v-for="p in allprojects.filter(pr => linkedprojects.indexOf(pr) == -1)" :value="p.id">{{p.name}}</option>
        </select>
        <div class="col-sm-3">
          <button type="button" class="full-width" v-on:click="addLinkedProject($event)">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Hinzufügen
          </button>
        </div>
      </div>
      <div class="row">
        <div id="linkedprojects" class="col-sm-6 col-sm-offset-3">
          <ul class="container-flex">
            <li class="row" v-for="p in linkedprojects">
              <div class="col-xs-10">{{p.name}}</div>
              <div class="col-xs-2">
                <i class="fa fa-minus" aria-hidden="true" :value="p.id" v-on:click="removeLinkedProject($event)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="col-sm-offset-3 col-sm-9 text-right">
            <button v-on:click="$router.push('/administration/mitarbeiter')" type="button"  style="margin-right:10px;">
              <i class="fa fa-times" aria-hidden="true"></i>
              Abbrechen
            </button>
            <button type="button" v-on:click="sendHTTP()">
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
import unorm from 'unorm'
import sjcl from 'sjcl'

export default {
  name: 'newemployee',
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      password_repeat: "",
      administrator: false,
      department: -1,

      rounds: 1000,

      linkedprojects: [],
      allprojects: [],
      alldepartments: [],
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/department', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.alldepartments = response.body;
    });


    this.$http.get('http://localhost:3000/api/project', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.allprojects = response.body;
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
    addLinkedProject: function(el) {

      var selectedproject = $("#addLinkedProjectSelect")[0];

      if (selectedproject.options.length == 0) {
        return 0;
      }

      selectedproject = selectedproject.options[selectedproject.selectedIndex].value;

      //find user with selected id in allusers
      var index = this.findById(this.allprojects, selectedproject);

      this.linkedprojects.push(this.allprojects[index]);

    },
    removeLinkedProject: function(el) {
      var index = this.findById(this.linkedprojects, el.srcElement.getAttribute("value"));

      this.linkedprojects.splice(index,1);
    },
    encrypt: function(pw_plaintext, username) {
      pw_plaintext = unorm.nfc(pw_plaintext)
      username = unorm.nfc(username.trim()).toLowerCase()
      // Deterministic unique salt: e.g. service name plus username
      var salt = sjcl.codec.utf8String.toBits("myservice" + username);
      // Run PBKDF2 computation, return result as hexadecimal encoding
      var key = sjcl.misc.pbkdf2(pw_plaintext, salt, this.rounds, 32 * 8, function(key) {
          var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha256);
          this.encrypt = function () {
              return hasher.encrypt.apply(hasher, arguments);
          };
      });
      return sjcl.codec.hex.fromBits(key);
    },
    sendHTTP: function() {

      //create json object
      var bodyobj = {
        firstname: this.firstname,
        lastname: this.lastname,
        department: (this.department == -1) ? null : this.department,
        admin: this.administrator ? 1 : 0,
      };

      var logdataBody = {
        username: this.username,
        password: this.encrypt(this.password, this.username),
      };

      this.$http.post("http://localhost:3000/api/user", bodyobj, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
        var goBack = 2;
        this.$http.post("http://localhost:3000/api/user_projects/"+response.body.id, this.linkedprojects, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          goBack = goBack - 1;
          if (goBack == 0) {
            this.$router.push('/administration/mitarbeiter');
          }
        });
        this.$http.post("http://localhost:3000/api/logdata/"+response.body.id, logdataBody, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
          goBack = goBack - 1;
          if (goBack == 0) {
            this.$router.push('/administration/mitarbeiter');
          }
        });
      });
    },
  }
}
</script>

<style scoped>
  .newemployee {
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

  .container-flex .row {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .container-flex label {
    margin: 0px;
  }

  input[type="checkbox"] {
    height: 18px;
    width: 18px;
    margin-top: 5px;
  }

  hr {
    border-color: transparent;
  }

  #linkedprojects ul {
    list-style-type: none;
    padding: 0px;
    max-height: 200px;
    overflow-y: scroll;
  }
  #linkedprojects li {
    width: 100%;
  }
  #linkedprojects .row {
    padding: 0px;
    margin: 0px;
    margin-bottom: 10px;
  }
</style>
