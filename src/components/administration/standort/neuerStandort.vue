<template>
  <div class="neuerStandort">
    <div id="neuerStandortDiv" class="center-block">
      <div id="app">
      <h3>
        Neuen Standort anlegen
      </h3>
      <router-link to="/administration/standort">
        <button id="btn_close" v-on:click="cancel"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
      </router-link>
      <div class="form-group">
        <label for="standortname">Standort:</label>
        <input type="text" class="form-control" id="standortname" placeholder="Name des Standorts" v-model="standortname">
      </div>
      <router-link to="/administration/standort">
        <button class="btn_rechts" v-on:click="create"><i class="fa fa-check" aria-hidden="true" ></i> Standort anlegen</button>
        <button class="btn_rechts" v-on:click="cancel"><i class="fa fa-times" aria-hidden="true" ></i> Abbrechen</button>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'neuerStandort',
}
</script>
<script>
var feiertag = new Vue({
  el: '#app',
  data:{
    standortname: ""
  },
  methods: {
    create: function(){
      alert("Standort wird erstellt! Land:" + this.standortname);
    },
    cancel: function(){
      alert("Standort wird nicht erstellt!!!");
    }
  }

})
</script>

<style scoped>
  .neuerStandort {
    height: 700px;
    text-align: center;
  }

  h1 {
    display: block;
    line-height: 700px;
  }

  button {
    box-shadow: 1px 1px 4px #ccc;
    color: #282828;
    background-color: white;
    padding: 5px 15px 5px 15px;
    border: 1px solid #ccc;
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

  #neuerStandortDiv {
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

  button:hover {
    background-color: rgb(245, 245, 245);
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
