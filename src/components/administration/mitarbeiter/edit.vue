<template>
<div class="editemployee">
  <div class="container">
    <div class="topper">
      <div class="row">
        <div class="col-sm-offset-3 col-sm-6">
          <h3>Mitarbeiter bearbeiten</h3>
        </div>
        <div class="col-sm-3 text-right">
          <button class="warning" type="button" v-on:click="deleteEmployee()"  :disabled="! canBeDeleted()">
            <i class="fa fa-trash" aria-hidden="true"></i>
            Löschen
          </button>
        </div>
      </div>
    </div>

    <form class="container-flex">
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Vorname:</label>
        <div class="col-sm-9">
          <input pattern="[A-Za-z \-äÄöÖüÜß]{2,}" maxlength="40" type="text" v-model="firstname" class="full-width" />
        </div>
      </div>
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Nachname:</label>
        <div class="col-sm-9">
          <input pattern="[A-Za-z \-äÄöÖüÜß]{2,}" maxlength="40" type="text" v-model="lastname" class="full-width" />
        </div>
      </div>
      <hr/>
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Username:</label>
        <div class="col-sm-9">
          <input pattern="([A-Za-z0-9]|-){5,}" maxlength="40" type="text" v-model="username" class="full-width" disabled />
        </div>
      </div>
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Passwort:</label>
        <!-- TODO: Make button work -->
        <div class="col-sm-9 text-left hidden-xs">
          <button type="button" v-on:click="" disabled>
            <i class="fa fa-repeat" aria-hidden="true"></i>
            Passwort zurücksetzen
          </button>
        </div>
        <div class="col-sm-9 hidden-sm hidden-md hidden-lg hidden-xl">
          <button type="button" v-on:click="" disabled>
            <i class="fa fa-repeat" aria-hidden="true"></i>
            Passwort zurücksetzen
          </button>
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
          <select :disabled="userIsManagerOfSelectedDepartment()" name="manager" class="full-width" v-on:change="" v-model="department">
            <option value="-1" selected>Keine Abteilung</option>
            <option v-for="d in alldepartments" :value="d.id">{{d.name}}</option>
          </select>
          <div class="warning" v-if="userIsManagerOfSelectedDepartment()"></div>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Projekte:</label>
        <select class="col-sm-6" id="addLinkedProjectSelect">
          <option v-for="p in allMinusLinkedProjects()" :value="p.id">{{p.name}}</option>
        </select>
        <div class="col-sm-3">
          <button type="button" class="full-width" v-on:click="addLinkedProject($event)">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Hinzufügen
          </button>
        </div>
      </div>
      <div class="row">
        <div id="linkedprojectsCol" class="col-sm-6 col-sm-offset-3">
          <ul class="container-flex">
            <li class="row" v-for="p in linkedprojects">
              <div class="col-xs-10">{{p.name}}</div>
              <div class="col-xs-2">
                <i v-if="p.manager != $route.params.id" class="fa fa-minus" aria-hidden="true" :value="p.id" v-on:click="removeLinkedProject($event)"></i>
                <i v-if="p.manager == $route.params.id" class="fa fa-minus" aria-hidden="true" style="color:rgba(0,0,0,0.2);"></i>
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
import unorm from 'unorm'
import sjcl from 'sjcl'

export default {
  name: 'editemployee',
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

    this.$http.get('http://localhost:3000/api/user/'+this.$route.params.id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.firstname = response.body.firstname;
      this.lastname = response.body.lastname;
      this.username = response.body.username;
      this.department = (response.body.departmentid || -1);
      this.administrator = (response.body.admin == 1);
      this.username = response.body.username;
    });

    this.$http.get('http://localhost:3000/api/user_project/'+this.$route.params.id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.linkedprojects = response.body;
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
      return -1;
    },
    addLinkedProject(el) {

      var selectedproject = $("#addLinkedProjectSelect")[0];

      if (selectedproject.options.length == 0) {
        return 0;
      }

      selectedproject = selectedproject.options[selectedproject.selectedIndex].value;

      //find user with selected id in allusers
      var index = this.findById(this.allprojects, selectedproject);

      this.linkedprojects.push(this.allprojects[index]);

    },
    removeLinkedProject(el) {
      var index = this.findById(this.linkedprojects, el.srcElement.getAttribute("value"));

      this.linkedprojects.splice(index,1);
    },
    encrypt(pw_plaintext, username) {
      pw_plaintext = unorm.nfc(pw_plaintext)
      username = unorm.nfc(username.trim()).toLowerCase()
      // Deterministic unique salt: e.g. service name plus username
      var salt = sjcl.codec.utf8String.toBits("myservice" + username);
      // Run PBKDF2 computation, return result as hexadecimal encoding
      var key = sjcl.misc.pbkdf2(pw_plaintext, salt, this.rounds, 32 * 8, (key) => {
          var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha256);
          this.encrypt = () => {
              return hasher.encrypt.apply(hasher, arguments);
          };
      });
      return sjcl.codec.hex.fromBits(key);
    },
    userIsManagerOfSelectedDepartment() {
      var all = this.alldepartments;
      var i = this.findById(all, this.department);

      if (i == -1) {
        return false;
      }

      return (all[i].manager == this.$route.params.id);
    },
    sendHTTP() {

      //create json object
      var bodyobj = {
        firstname: this.firstname,
        lastname: this.lastname,
        departmentid: (this.department == -1) ? null : this.department,
        admin: this.administrator ? 1 : 0,
      };

      var goBack = 2;

      var f1 = response => {
        goBack = goBack - 1;
        if (goBack == 0) {
          this.$router.push('/administration/mitarbeiter');
        }
      };

      this.$http.put("http://localhost:3000/api/user/"+this.$route.params.id, bodyobj, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(f1);

      this.$http.put("http://localhost:3000/api/user_projects/"+this.$route.params.id, this.linkedprojects, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(f1);

    },
    deleteEmployee() {
      if(! confirm("Sind sie sicher, dass sie diesen Mitarbeiter löschen möchten? \nDieser Vorgang kann nicht rückgänig gemacht werden")) {
        return;
      }

      this.$http.delete("http://localhost:3000/api/user/"+this.$route.params.id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
        this.$router.push('/administration/mitarbeiter');
      }).catch(err=>{console.log(err)});
    },
    allMinusLinkedProjects() {
      return this.allprojects.filter(ap => (
        this.linkedprojects.filter(lp => (lp.id == ap.id)).length == 0
      ));
    },
    canBeDeleted() {

      //check if user is a project manager
      for(var i = 0; i < this.allprojects.length; i++) {
        if(this.allprojects[i].manager == this.$route.params.id) {
          return false;
        };
      };

      //check if user is a department manager
      for(var i = 0; i < this.alldepartments.length; i++) {
        if(this.alldepartments[i].manager == this.$route.params.id) {
          return false;
        };
      };

      return true;
    }
  },
  computed:{
    isComplete(){
      return this.firstname && this.lastname && this.username;
    }
  }
}
</script>

<style scoped>
  .editemployee {
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

  #linkedprojectsCol ul {
    list-style-type: none;
    padding: 0px;
    max-height: 200px;
    overflow-y: scroll;
  }
  #linkedprojectsCol li {
    width: 100%;
  }
  #linkedprojectsCol .row {
    padding: 0px;
    margin: 0px;
    margin-bottom: 10px;
  }

  div.warning {
    background-color: rgba(255,255,255,0.5);
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    color: #cc0000;
  }
</style>
