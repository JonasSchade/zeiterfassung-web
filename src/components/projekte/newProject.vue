<template>
<div class="newProject">

  <div id="newProjectDiv">
    Hier kann man DAten für ein neues Projekt eingeben....
    <button id="btn_close" v-on:click="hideProjectSettings()"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
    <div class="form-group">
      <label for="prjname">Projektname:</label>
      <input type="text" class="form-control" id="prjname">
    </div>
    <div class="form-group">
      <label for="description">Beschreibung:</label>
      <input type="text" class="form-control" id="description">
    </div>
    <button v-on:click="newProjectButtonPress()"><i class="fa fa-check" aria-hidden="true"></i> Projekt anlegen</button>
  </div>

  <div id="container">
<p id="arsch">kbjbk</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'projekte',

  methods: {

    showProjectSettings: function(event) {
      document.getElementById("newProjectDiv").style.display = "block";
      document.getElementById("btn_new_project").style.display = "none";
    },

    hideProjectSettings: function(event) {
      document.getElementById("newProjectDiv").style.display = "none";
      document.getElementById("btn_new_project").style.display = "block";
    },

    newProjectButtonPress: function(event) {
      document.getElementById("newProjectDiv").style.display = "none";
      document.getElementById("btn_new_project").style.display = "block";
      var box = document.createElement("div");
      box.className = "project_box";
      document.getElementById("container").appendChild(box);
      var projName = document.createElement("p");
      projName.innerHTML = "Projekt1";
      document.getElementById("arsch").innerHTML = "kackeee";
      box.appendChild(projName);
    }
  }

}
</script>

<style scoped>
.projekte {
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

#btn_close{
  box-shadow: none;
  color: #282828;
  background-color: white;
  padding: 5px 15px 5px 15px;
  border: 0;
}

#btn_new_project {
  top: 20px;
}

#newProjectDiv {
  display: none;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  padding-left: 0px;
  padding-right: 0px;
  padding: 20px;
}

button:hover {
  background-color: rgb(245, 245, 245);
}

h1 {
  display: block;
  line-height: 100px;
}
</style>
