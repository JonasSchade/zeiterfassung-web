<template>
<div class="projekte">
  <router-link to="/newProject">
    <button id="btn_new_project"><i class="fa fa-plus" aria-hidden="true"></i> Neues Projekt</button>
  </router-link>
  <div id="container">
    <p id="abc">kbjbk</p>
  </div>
</div>
</template>

<script>
var anzProjekte = 3;
export default {
  name: 'projekte',

  methods: {

  },
  mounted() {
    for (var i = 0; i < anzProjekte; i++) {
      var box = document.createElement("div");
      box.classList.add("project_box");
      document.getElementById("container").appendChild(box);
      var projName = document.createElement("p");
      projName.innerHTML = "hallo";
      box.appendChild(projName);
    }
    document.getElementById("btn_new_project").style.background = "red";
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

#btn_new_project {
  margin: 20px;
}

button:hover {
  background-color: rgb(245, 245, 245);
}

.project_box {
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  padding-left: 0px;
  padding-right: 0px;
  padding: 20px;
}

h1 {
  display: block;
  line-height: 100px;
}
</style>
