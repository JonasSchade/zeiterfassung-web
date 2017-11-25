<template>
  <div class="dashboard-day-detail">
    <div class="container">
      <div class="row">
        <div class="col-sm-4  text-left">
          <button v-on:click="$router.push('/dashboard/')">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            Dashboard
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h3>{{ formattedDate }}</h3>
        </div>
        <div class="col-sm-12 text-left">
          <div class="card">
            <h4 class="header">
              <i class="fa fa-clock-o" aria-hidden="true"></i>Arbeitszeiten:
            </h4>
            <hr/>
            <div class="content">
              <form class="container">
                <div class="row">
                  <label class="col-sm-1 text-left">Von:</label>
                  <div class="col-sm-3 text-left">
                  <input type="text" id="time-start-hours" placeholder="hh" maxlength="2" size="2">
                  <span>:</span>
                  <input type="text" id="time-start-minutes" placeholder="mm" maxlength="2" size="2">
                  <span>Uhr</span>
                  </div>
                </div>
                <div class="row">
                  <label class="col-sm-1 text-left">Bis:</label>
                  <div class="col-sm-3 text-left">
                    <input type="text" id="time-start-hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-start-minutes" placeholder="mm" maxlength="2" size="2">
                    <span>Uhr</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard-day-detail',

  computed: {
    "formattedDate": function () {
      return moment(this.$route.params.day).locale("de").format("DD.MMMM YYYY");
    },
  },
}
</script>

<style scoped>

  *[class^="col-sm-"] {
    padding: 5px;
  }

  .card {
    background-color: white;
    border-radius: 2px;
    box-shadow: 0px 0px 7px #ccc;
    border: 1px solid #ccc;
    max-width: 400px;
  }

  .card>.header {
    text-align: left;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    color: #282828;
    background-color: white;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
  }

  .card>.header>i {
    padding-right: 7px;
  }

  .card>hr {
    margin: 0px;
  }

  .card>.content {
    padding-top: 5px;
    padding-bottom: 5px;
  }


  .row {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 0px;
    margin-right: 0px;
  }

  div[class^="col-sm-"] {
    padding: 5px;
  }

  button {
    border: 1px solid #ccc;
    box-shadow: 1px 1px 4px #ccc;
    color: #282828;
    background-color: white;
    padding: 5px 15px 5px 15px;
    outline-width: 0;
  }

  button:hover {
    background-color: rgb(245,245,245);
  }

  h3 {
    margin: 0px;
  }

  input {
    color: black;
    margin: 0px;
    text-align: center;
    border: none;
    border-bottom: lightgrey 1px solid;
    outline-width: 0;
    transition: ease-in-out border-bottom .2s;
  }

  input:focus {
    border-bottom: #003452 1px solid;
  }
</style>
