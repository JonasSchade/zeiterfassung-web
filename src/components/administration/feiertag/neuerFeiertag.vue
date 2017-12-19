<template>
  <div class="neuerFeiertag">
    <div id="neuerFeiertagDiv" class="center-block">
      <div id="app">
      <h3>
        Neuen Feiertag anlegen
      </h3>
      <router-link to="/administration/feiertag">
        <button id="btn_close" v-on:click="cancel"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
      </router-link>
      <div class="form-group">
        <label for="feiertagname">Feiertag:</label>
        <input type="text" class="form-control" id="feiertagname" placeholder="Name des Feiertags" v-model="feiertagname">
      </div>
      <router-link to="/administration/feiertage">
        <button class="btn_rechts" v-on:click="create"><i class="fa fa-check" aria-hidden="true" ></i> Feiertag anlegen</button>
        <button class="btn_rechts" v-on:click="cancel"><i class="fa fa-times" aria-hidden="true" ></i> Abbrechen</button>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'neuerFeiertag',
}
</script>
<script>
var feiertag = new Vue({
  el: '#app',
  data:{
    feiertagname: ""
  },
  methods: {
    create: function(){
      alert("Feiertag wird erstellt! Land:" + this.feiertagname);
    },
    cancel: function(){
      alert("Feiertag wird nicht erstellt!!!");
    }
  }

})
</script>

<style scoped>
  .neuerFeiertag {
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

  #neuerFeiertagDiv {
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
