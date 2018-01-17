<template>
<div class="settings">
  <div class="container">
    <div class="topper">
      <div class="row">
        <div class="col-sm-4 text-left">
        </div>
        <div class="col-sm-4">
          <h3>Passwort ändern</h3>
        </div>
      </div>
    </div>
    <form class="form-group container-flex" id="settingsForm">
      <div class="row">
        <div id="username_container" class="col-sm-3">
          <span>
            Username:
          </span>
        </div>
        <div class="col-sm-9">
          <p>
            {{benutzer}}
          </p>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right" for="password_alt">Altes Passwort:</label>
        <div class="col-sm-9">
          <input type="password" class="full-width" name="password_alt" id="password_alt" placeholder="Altes Passwort"  v-model="password_alt">
        </div>
      </div>
      <div class="row">

      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right" for="password_neu">Neues Passwort:</label>
        <div class="col-sm-9">
          <input type="password" class="full-width" name="password_neu" id="password_neu" placeholder="Neues Passwort"  v-model="password_neu">
        </div>
      </div>
      <div class="row">
        <label for="password_repeat" class="col-sm-offset-1 col-sm-3 text-right">Passwort bestätigen:</label>
        <div class="col-sm-9">
          <input type="password" class="full-width" name="password_repeat" id="password_repeat" placeholder="Passwort bestätigen"  v-model="password_repeat">
          <span id="warning" v-if="password_neu != password_repeat">Stimmt nicht mit neuem Passwort überein!</span>
        </div>
      </div>
    </form>
    <router-link to="/dashboard">
      <button :disabled='!isComplete' class="btn_confirm"><i class="fa fa-check" v-on:click="setPassword()"></i> Passwort ändern</button>
      <button class="btn_confirm"><i class="fa fa-times"></i> Abbrechen</button>
    </router-link>
    {{password_alt}} {{password_neu}} {{password_repeat}}
  </div>
</div>
</template>

<script>
export default {
  name: 'settings',
  methods: {
    setPassword: function(){
      var obj = new Object();
      obj.username = this.benutzer;
      obj.password = this.password_neu;
      obj.userid = this.userId;

      this.$http.put('http://localhost:3000/api/logdata/'+this.userId, obj, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {

      });
    }
  },
  data: function() {
    return {
      benutzer: "",
      userId: "",
      password_alt: "",
      password_neu: "",
      password_repeat: ""
    }
  },
  created() {
    this.$http.get('http://localhost:3000/api/authenticate', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.benutzer = response.body.username;
    });
  },
  computed: {
  isComplete () {
    return this.password_alt && this.password_neu && this.password_repeat && this.password_neu == this.password_repeat;
  }
}
}
</script>

<style scoped>
.settings {
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

h3 {
  display: block;
  line-height: 50px;
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

.col-sm-9 {
  text-align: left;
  margin-bottom: 10px;
}

.btn_confirm{
  float: right;
  margin: 5px;
  width: 160px;
}

span{
  font-weight: bold;
}

#username_container{
    text-align: right;
}

#warning{
  font-weight: lighter;
  font-size: 10px;
  color: red;
}
</style>
