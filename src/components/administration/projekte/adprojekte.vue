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
        <div class="col-sm-4  text-middle">
          <h3>Projekte</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
        </div>
        <div class="col-sm-4">
        </div>
        <div class="col-sm-4 text-right">
          <router-link to="/newProject">
            <button id="btn_new_project"><i class="fa fa-plus" aria-hidden="true"></i> Neues Projekt</button>
          </router-link>
        </div>
      </div>
    </div>

    <div role="tablist">
      <div v-for="project in projects">
        <b-card class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <div class="row">
              <div class="col-sm-12">
                <div class="pjkt_button" block v-b-toggle="'test-'+project.ID">{{project.Name}}
                  <i class="settings fa fa-pencil-square-o " v-on:click="$router.push('/administration/')" aria-hidden="true"></i>
                </div>
              </div>

            </div>
          </b-card-header>
          <b-card-body>
            <b-collapse v-bind:id="'test-'+project.ID" visible accordion="my-accordion" role="tabpanel">

              <div class="information">

                  <p class="card-text">
                    {{ project.Manager }}
                  </p>

                  <p class="card-text">
                    {{ text }}
                  </p>

              </div>

            </b-collapse>
          </b-card-body>
        </b-card>
      </div>


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

    Vue.http.get('http://localhost:3000/api/projekte').then(response => {
      console.log(response);
      this.projects = response.body;
    });
  }
}
</script>

<style scoped>
.adprojekte {
  height: 700px;
  text-align: center;
}

.header {
  background-color: #cdd2d8;
  padding: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0px;
}

h1 {
  display: block;
  margin: 20px;
}

.container {
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  margin-bottom: 30px;
  padding-left: 0px;
  padding-right: 0px;
}

.mb-1 {
  margin-bottom: 30px;
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

.topper {
  margin-bottom: 30px;
}

.settings {
  color: white;
  background-color: none;
  float: right;
  line-height: 26px;
}

.information{
  border-radius: 0px 0px 3px 3px;
  box-shadow: 0px 0px 7px #ccc;
  padding: 20px;
}

.p-1{
    box-shadow: 0px 0px 7px #ccc;
}

</style>
