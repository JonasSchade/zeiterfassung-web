<template>
<div class="newProject">
  <div id="newProjectDiv" class="center-block">
    Hier kann man Daten für ein neues Projekt eingeben...
    <router-link to="/projekte">
      <button id="btn_close"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
    </router-link>
    <div class="form-group">
      <label for="prjname">Projektname:</label>
      <input type="text" class="form-control" id="prjname">
    </div>
    <div class="form-group">
      <label for="description">Beschreibung:</label>
      <input type="text" class="form-control" id="description">
    </div>
    <router-link to="/projekte">
      <button><i class="fa fa-check" aria-hidden="true"></i> Projekt anlegen</button>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'newProject',

  methods: {

    newProjectButtonPress: function(event) {

    }
  }

}
</script>

<style scoped>
.newProject {
  height: 700px;
  text-align: center;
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

#newProjectDiv {
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  padding-left: 0px;
  padding-right: 0px;
  padding: 30px;
}

button:hover {
  background-color: rgb(245, 245, 245);
}

h1 {
  display: block;
  line-height: 100px;
}
</style>
