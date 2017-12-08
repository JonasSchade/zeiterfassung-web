<template>
  <div class="adprojekte">
    <router-link to="/newProject">
      <button id="btn_new_project"><i class="fa fa-plus" aria-hidden="true"></i> Neues Projekt</button>
    </router-link>
    <div class="container">
      <h1>Projekte</h1>

        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion1 variant="info">Accordion 1</b-btn>
            </b-card-header>
            <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <p class="card-text">
                  I start opened because <code>visible</code> is <code>true</code>
                </p>
                <p class="card-text">
                  {{ text }}
                </p>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion2 variant="info">Accordion 2</b-btn>
            </b-card-header>
            <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <p class="card-text">
                  {{ text }}
                </p>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion3 variant="info">Accordion 3</b-btn>
            </b-card-header>
            <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <p class="card-text">
                  {{ text }}
                </p>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'adprojekte',
  data () {
   return {
     text: `
       Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
       richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
       brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
       tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
       assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
       wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
       vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
       synth nesciunt you probably haven't heard of them accusamus labore VHS.
     `
   }
 }
}
</script>

<style scoped>
  .adprojekte {
    height: 700px;
    text-align: center;
  }

  h1 {
    display: block;
    line-height: 50px;
  }

  #btn_new_project{
    box-shadow: 1px 1px 4px #ccc;
    color: #282828;
    background-color: white;
    padding: 5px 15px 5px 15px;
    border: 1px solid #ccc;
    margin: 20px;
  }

  .container{
    box-shadow: 1px 1px 4px #ccc;
  }
</style>
