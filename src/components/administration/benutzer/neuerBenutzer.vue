<template>
<div class="neuerBenutzer">
    <div class="container">
      <div class="topper">
        <div class="row">
          <div class="col-sm-4 text-left">
            <button v-on:click="$router.push('/administration/benutzer')">
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
              Benutzer
            </button>
          </div>
          <div class="col-sm-4">
            <h3>Neuer Benutzer</h3>
          </div>
        </div>
      </div>
      <form class="form-group container-flex" id="newUserForm">
        <div class="row">
          <label for="lastname" class="col-sm-offset-1 col-sm-3 text-right">Nachname:</label>
          <div class="col-sm-9">
            <input type="text" class="full-width" name="lastname" id="lastname" placeholder="Nachname">
          </div>
        </div>
        <div class="row">
          <label for="firstname" class="col-sm-offset-1 col-sm-3 text-right">Vorname:</label>
          <div class="col-sm-9">
            <input type="text" class="full-width" name="firstname" id="firstname" placeholder="Vorname">
          </div>
        </div>
        <div class="row">
          <label for="username" class="col-sm-offset-1 col-sm-3 text-right">Username:</label>
          <div class="col-sm-9">
            <input type="text" class="full-width" name="username" id="username" placeholder="Username">
          </div>
        </div>
        <div class="row">
          <label class="col-sm-offset-1 col-sm-3 text-right" for="password">Passwort:</label>
          <div class="col-sm-9">
            <input type="text" class="full-width" name="password" id="password" placeholder="Passwort">
          </div>
        </div>
        <div class="row">
          <label for="password_repeat" class="col-sm-offset-1 col-sm-3 text-right">Passwort wiederholen:</label>
          <div class="col-sm-9">
            <input type="text" class="full-width" name="password_repeat" id="password_repeat" placeholder="Passwort wiederholen">
          </div>
        </div>
        <div class="row">
            <label for="selecteddepartment" class="col-sm-offset-1 col-sm-3 text-right">Abteilung:</label>
          <div class="col-sm-9">
            <select v-model="selecteddepartment" name="selecteddepartment" id="selecteddepartment">
              <option disabled value="">Wähle eine Abteilung aus</option>
              <option>Keine Abteilung</option>
              <option v-for="department in departments" :value="department.id">
                {{department.name}}
              </option>
            </select>
            <span>{{ selecteddepartment }}</span>
          </div>
        </div>
        <div class="row">
          <label class="col-sm-offset-1 col-sm-3 text-right">Administrator</label>
          <div class="col-sm-9">
            <input type="checkbox" id="isAdmin" value="Administrator" v-model="isAdminValue">
            <span>{{ isAdminValue }}</span>
          </div>
        </div>
      </form>
      <div class="row">
        <div class="col-sm-3">

        </div>
        <div class="col-sm-9">
          <button class="btn_rechts" v-on:click="sendHTTP()"><i class="fa fa-check" aria-hidden="true" ></i> Benutzer anlegen</button>
          <router-link to="/administration/benutzer">
            <button class="btn_rechts" v-on:click="cancel"><i class="fa fa-times" aria-hidden="true" ></i> Abbrechen</button>
          </router-link>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'neuerBenutzer',
  data: function() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      selecteddepartment: "",
      departments: [],
      department: "",
      users: null,
      userId: "",
      isAdminValue: false
    };
  },
  created() {

    this.$http.get('http://localhost:3000/api/department').then(response => {
      this.departments = response.body;
    });
  },
  methods: {
    create: function() {
      alert("Benutzer wird erstellt! Nachname:" + this.benutzername);
    },
    cancel: function() {
      alert("Benutzer wird nicht erstellt!!!");
    },
    sendHTTP: function() {

      //Make sure all inputs are valid
      if (!this.validate()) {
        return;
      }

      //create json object
      var formArr = $("#newUserForm").serializeArray();
      var obj = new Object();
      obj.firstname = formArr[0].value;
      obj.lastname = formArr[1].value;
      obj.departmentid = formArr[5].value;

      console.log(obj);

      //POST Request
      this.$http.post("http://localhost:3000/api/user/", obj).then((response) => {

      });

      this.$http.get('http://localhost:3000/api/user').then(response => {
        this.users = response.body;
        console.log(this.users);
      });

      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].firstname == this.firstname) {
          this.userId = this.users[i].id;
        }
      }
      var logobj = new Object();
      logobj.userid = this.userId;
      logobj.username = formArr[2].value;
      logobj.password = formArr[3].value;
      console.log(logobj);
      this.$http.post("http://localhost:3000/api/logdata", logobj).then(function(response) {
        this.$router.push('/administration/benutzer')
      }, function(response) {
        return;
      });
    },
    validate: function() {
      var formArr = $("#newUserForm").serializeArray();

      var firstname = formArr.filter(x => x.name == "firstname")[0].value;
      var lastname = formArr.filter(x => x.name == "lastname")[0].value;
      var password = formArr.filter(x => x.name == "password")[0].value;
      var password_repeat = formArr.filter(x => x.name == "password_repeat")[0].value;
      var selecteddepartment = formArr.filter(x => x.name == "selecteddepartment")[0].value;

      if (firstname == "") {
        alert("Bitte Vornamen eingeben!");
        return false;
      }
      if (lastname == "") {
        alert("Bitte Nachnamen eingeben!");
        return false;
      }
      if (firstname.length < 2) {
        alert("Der Vorname muss aus mindestens zwei Buchstaben bestehen.");
        return false;
      }
      if (lastname.length < 2) {
        alert("Der Nachname muss aus mindestens zwei Buchstaben bestehen.");
        return false;
      }
      if (password != password_repeat) {
        alert("Passwort stimmt nicht überein.");
        return false;
      }

      return true;
    }
  }
}
</script>

<style scoped>
.neuerBenutzer {
  width: 100%;
  text-align: center;
}

.topper {
  margin-bottom: 20px;
}

.topper h3 {
  margin-bottom: 5px;
  margin-top: 5px;
}

h3 {
  display: block;
  line-height: 50px;
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

.btn_rechts {
  margin-top: 30px;
  margin-bottom: 30px;
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

input {
  margin-bottom: 10px;
}

.col-sm-9{
  text-align: left;
  margin-bottom: 10px;
}
</style>
