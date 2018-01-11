<template>
<div class="projekte">
  <div class="container">

    <div class="topper">
      <div class="row">
        <div class="col-sm-4 text-left">
          <button v-on:click="$router.push('/administration/')">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            Administration
          </button>
        </div>
        <div class="col-sm-4">
          <h3>Projekte</h3>
        </div>
        <div class="col-sm-4 text-right">
          <button id="btn_new_project" v-on:click="$router.push('projekte/new')">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Neues Projekt
           </button>
         </div>
      </div>
    </div>

    <div class="tablist" role="tablist">
      <projektcontainer v-for="project in projects" :key="project.id" :contentid="project.id" :contentname="project.name">
        <p class="card-text">
          {{ project.manager }}
        </p>
        <p class="card-text">
          {{ project.description }}
        </p>
      </projektcontainer>
    </div>

  </div>
</div>
</template>

<script>
import projektcontainer from '@/components/administration/projekte/projektconatiner'

export default {
  name: 'projekte',
  components: { projektcontainer },
  data() {
    return {
      projects: []
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/project').then(response => {
      console.log(response);
      this.projects = response.body;
    });
  }
}
</script>

<style scoped>
.projekte {
  min-height: 700px;
  text-align: center;
}

.topper {
  margin-bottom: 20px;
}

.topper h3 {
  margin-bottom: 5px;
  margin-top: 5px;
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

</style>
