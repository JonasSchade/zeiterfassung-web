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
      <div class="form-group">
        <span>
            <label for="benutzername">Nachname:</label>
          <input type="text" class="form-control" id="lastname" placeholder="Nachname des Benutzers" v-model="lastname">
        </span>
        <span>
          <label for="benutzername">Vorname:</label>
          <input type="text" class="form-control" id="firstname" placeholder="Vorname des benutzers" v-model="firstname">
        </span>
        <div>
        Wähle den Standort:
        <select v-model="selectedcity">
          <option disabled value="">>Wähle einen Standort aus</option>
          <option>München</option>
          <option>Berlin</option>
          <option>Frankfurt</option>
        </select>
        <span>Ausgewählt: {{ selectedcity }}</span>
      </div>
        <div>
          Wähle die Abteilung
          <select v-model="selectedabt">
            <option disabled value="">Wähle eine Abteilung aus</option>
            <option>Marketing</option>
            <option>IT</option>
            <option>Buchhaltung</option>
          </select>
          <span>Ausgewählt: {{ selectedabt }}</span>
        </div>
      </div>
      <router-link to="/administration/benutzer">
        <button class="btn_rechts" v-on:click="create"><i class="fa fa-check" aria-hidden="true" ></i> Benutzer anlegen</button>
        <button class="btn_rechts" v-on:click="cancel"><i class="fa fa-times" aria-hidden="true" ></i> Abbrechen</button>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'neuerBenutzer',
}
</script>
<script>
var benutzer = new Vue({
  el: '#app',
  data:{
    firstname: "",
    lastname: "",
    selectedcity: "",
    selectedabt: ""
  },
  methods: {
    create: function(){
      alert("Benutzer wird erstellt! Nachname:" + this.benutzername);
    },
    cancel: function(){
      alert("Benutzer wird nicht erstellt!!!");
    }
  }

})
</script>

<style scoped>
  .neuerBenutzer {
    height: 700px;
    text-align: center;
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
</style>
