<template>
<div class="projekte">
  <router-link to="/newProject">
    <button id="btn_new_project"><i class="fa fa-plus" aria-hidden="true"></i> Neues Projekt</button>
  </router-link>
  <div id="container">
    <ul id="example-1">
      <projectcontainer v-for="item in items" :key="item.name" :project-name="item.name" :project-description="item.beschreibung">

      </projectcontainer>
    </ul>
  </div>
</div>
</template>

<script>
import projectcontainer from '@/components/projects/projectcontainer'
export default {
  name: 'projekte',
  components: {projectcontainer},
  methods: {

  },
  data: function() {
    return {
      items: [
        { name: 'Projekt Foo', beschreibung: 'Das ist ein super Projekt' },
        { name: 'Projekt Baa', beschreibung: 'Das ist ein tolles Projekt' }
      ],
    }
  },
  /*
  mounted() {
    for (var i = 0; i < anzProjekte; i++) {
      var box = document.createElement("projectcontainer");
      document.getElementById("container").appendChild(box);
      var projName = document.createElement("p");
      projName.innerHTML = "hallo";
      box.appendChild(projName);
    }
    document.getElementById("btn_new_project").style.background = "red";
  }
*/
}
</script>

<style scoped>
.projekte {
  height: 700px;
  text-align: center;
}

#btn_new_project {
  margin: 20px;
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
