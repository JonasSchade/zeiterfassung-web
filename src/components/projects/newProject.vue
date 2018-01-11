<template>
<div class="newProject">
  <div id="newProjectDiv" class="center-block">
    <h3>
      Neues Projekt anlegen
    </h3>
    <router-link to="/administration/projekte">
      <button id="btn_close"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
    </router-link>
    <div class="form-group">
      <label for="prjname">Projektname:</label>
      <input type="text" class="full-width" id="prjname" placeholder="Projektname">
    </div>
    <div class="form-group">
      <label for="description">Projektleiter:</label>
      <input type="text" class="full-width" id="description" placeholder="Projektleiter"">
    </div>
    <div class="form-group">
      <label for="description">Beschreibung:</label>
      <input type="text" class="full-width" id="description" placeholder="Beschreibung"">
    </div>
    <router-link to="/administration/projekte">
      <button class="btn_rechts"><i class="fa fa-check" aria-hidden="true"></i> Projekt anlegen</button>
      <button class="btn_rechts"><i class="fa fa-times" aria-hidden="true"></i> Abbrechen</button>
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

#btn_close {
  position: absolute;
  font-size: 20px;
  right: 10px;
  top: 10px;
  color: #003452;
  box-shadow: none;
  background-color: white;
  border: 0;
}

#newProjectDiv {
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  box-shadow: 0px 0px 7px #ccc;
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
width: 160px;
}

</style>
