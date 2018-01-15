<template>
  <div class="neuerBenutzer">
    <div id="neuerBenutzerDiv" class="center-block">
      <div id="app">
      <h3>
        Neuen Benutzer anlegen
      </h3>
      <router-link to="/administration/benutzer">
        <button id="btn_close" v-on:click="cancel"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
      </router-link>
      <form class="form-group" id="newUserForm">
        <span>
            <label for="benutzername">Nachname:</label>
          <input type="text" class="full-width" name="lastname" id="lastname" placeholder="Nachname">
        </span>
        <span>
          <label for="benutzername">Vorname:</label>
          <input type="text" class="full-width" name="firstname" id="firstname" placeholder="Vorname">
        </span>
        <span>
          <label for="password">Passwort:</label>
          <input type="text" class="full-width" name="password" id="password" placeholder="Passwort">
        </span>
        <span>
          <label for="password">Passwort wiederholen:</label>
          <input type="text" class="full-width" name="password_repeat" id="password_repeat" placeholder="Passwort wiederholen">
        </span>
        <div>
          <p>
            Abteilung:
          </p>
          <select v-model="department" name="department" id="department">
            <option disabled value="">Wähle eine Abteilung aus</option>
            <option>Marketing</option>
            <option>IT</option>
            <option>Buchhaltung</option>
            <option>Keine Abteilung</option>
          </select>
          <span>{{ department }}</span>
        </div>
      </form>
        <button class="btn_rechts" v-on:click="sendHTTP()"><i class="fa fa-check" aria-hidden="true" ></i> Benutzer anlegen</button>
        <router-link to="/administration/benutzer">
        <button class="btn_rechts" v-on:click="cancel"><i class="fa fa-times" aria-hidden="true" ></i> Abbrechen</button>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'neuerBenutzer',
  data: function () {
    return {
      firstname: "",
      lastname: "",
      password: "",
      department: ""
    };
  },
  methods: {
    create: function(){
      alert("Benutzer wird erstellt! Nachname:" + this.benutzername);
    },
    cancel: function(){
      alert("Benutzer wird nicht erstellt!!!");
    },
    sendHTTP: function() {

      //Make sure all inputs are valid
      if(! this.validate()) {
        return;
      }

      //create json object
      var formArr = $("#newUserForm").serializeArray();
      var obj = new Object();
      for (var i = 0; i < formArr.length; i++) {

        obj[formArr[i].name] = formArr[i].value;
      }

      //POST Request
    //  this.$http.post("http://localhost:3000/api/user", obj).then(function(response) { this.$router.push('/administration/benutzer') }, function(response) { return; });
    },
    validate: function() {
      var formArr = $("#newUserForm").serializeArray();

      var firstname = formArr.filter(x => x.name == "firstname")[0].value;
      var lastname = formArr.filter(x => x.name == "lastname")[0].value;
      var password = formArr.filter(x => x.name == "password")[0].value;
      var password_repeat = formArr.filter(x => x.name == "password_repeat")[0].value;
      var department = formArr.filter(x => x.name == "department")[0].value;

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
    height: 700px;
    text-align: left;
  }

  h1 {
    display: block;
    line-height: 700px;
  }

  #btn_close {
    position: absolute;
    font-size: 20px;
    right: 15px;
    top: 10px;
    box-shadow: none;
    color: #003452;
    background-color: white;
    padding: 5px 15px 5px 15px;
    border: 0;
  }

  #neuerBenutzerDiv {
    position: relative;
    max-width: 800px;
    top: 20px;
    bottom: 20px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
    padding-left: 0px;
    padding-right: 0px;
    padding: 30px;
    text-align: left;
  }

  h3 {
    display: block;
    line-height: 50px;
  }

  .btn_rechts{
  margin-top: 30px;
  margin-bottom: 30px;
  }

  #app{
    text-align: left;
  }

  p{
    font-weight: bold;
  }

  input{
    margin-bottom: 20px;
  }
</style>
