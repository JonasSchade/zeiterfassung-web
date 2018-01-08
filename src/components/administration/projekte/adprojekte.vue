<template>
  <div class="adprojekte">
    <router-link to="/newProject">
      <button id="btn_new_project"><i class="fa fa-plus" aria-hidden="true"></i> Neues Projekt</button>
    </router-link>
    <div class="container">
      <div class="header">
          <h1>Projekte</h1>
      </div>

        <div role="tablist">
          <div v-for="project in projects">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn class="pjkt_button" block href="#" v-b-toggle.accordion variant="info">Name: {{project.Name}}</b-btn>
              </b-card-header>
              <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <p class="card-text">
                      {{ project.Manager }}
                  </p>
                  <p class="card-text">
                    {{ text }}
                  </p>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>


        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'adprojekte',
  data () {
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
.header{
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
  #btn_new_project{
    box-shadow: 1px 1px 4px #ccc;
    color: #282828;
    background-color: white;
    padding: 10px;
    margin: 25px;
    border: 1px solid #ccc;
  }
  .container{
    position: relative;
    max-width: 800px;
    top: 20px;
    bottom: 20px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
    margin-bottom: 30px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .mb-1{
    margin: 10px;
  }
  .pjkt_button {
      background-color: #003452;
      padding: 10px;
  }
</style>
