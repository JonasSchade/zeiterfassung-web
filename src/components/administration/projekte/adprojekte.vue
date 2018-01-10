<template>
<div class="adprojekte">
  <div class="container">

    <div class="topper">
      <div class="row">
        <div class="col-sm-4 text-left">
          <button v-on:click="$router.push('/administration/')">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            Administration
          </button>
        </div>
        <div class="col-sm-4 text-middle">
          <h3>Projekte</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-offset-8 col-sm-4 text-right">
          <button id="btn_new_project" v-on:click="$router.push('../newProject')">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Neues Projekt
           </button>
        </div>
      </div>
    </div>

    <div class="tablist" role="tablist">
      <b-card v-for="project in projects" :key="project.id">
        <b-card-header header-tag="header" class="row" role="tab">
          <div class="col-sm-12">
            <div class="pjkt_button" block v-b-toggle="'conatiner-'+project.id">{{project.name}}
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              <i class="fa fa-pencil-square-o " v-on:click="$router.push('/administration/')" aria-hidden="true"></i>
            </div>
          </div>
        </b-card-header>
        <b-card-body class="row">
          <b-collapse class="col-sm-12" v-bind:id="'conatiner-'+project.id" role="tabpanel" accordion="tablist">
            <div>
              <p class="card-text">
                {{ project.manager }}
              </p>
              <p class="card-text">
                {{ project.description }}
              </p>
            </div>
          </b-collapse>
        </b-card-body>
      </b-card>


    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'adprojekte',
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
.adprojekte {
  min-height: 700px;
  text-align: center;
}

.topper {
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

.tablist .card {
  margin-bottom: 30px;
}

.tablist .card-header {
  box-shadow: 0px 0px 7px #ccc;
}

.tablist .card-body, .tablist .card-header {
  margin-left: 0px;
  margin-right: 0px;
}

.tablist .col-sm-12 {
  padding: 0px;
}

.pjkt_button {
  text-align: left;
  background-color: #003452;
  padding: 20px;
  border: none;
  font-size: 18px;
  color: white;
  box-shadow: 0px 0px 7px #ccc;
}

.pjkt_button i {
  color: white;
  background-color: none;
  float: right;
  line-height: 26px;
  margin-left: 15px;
}

.collapse div {
  border-radius: 0px 0px 3px 3px;
  box-shadow: 0px 0px 7px #ccc;
  padding: 20px;
}

</style>
