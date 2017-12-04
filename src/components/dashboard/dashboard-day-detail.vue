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
              <form class="container-flex">
                <div class="row">
                  <label class="col-xs-2 text-left">Von:</label>
                  <div class="col-xs-10 text-left">
                  <input type="text" id="time-start-hours" @input="checkInput" placeholder="hh" maxlength="2" size="2">
                  <span>:</span>
                  <input type="text" id="time-start-minutes" @input="checkInput" placeholder="mm" maxlength="2" size="2">
                  <span>Uhr</span>
                  </div>
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Bis:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-stop-hours" @input="checkInput" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-stop-minutes" @input="checkInput" placeholder="mm" maxlength="2" size="2">
                    <span>Uhr</span>
                  </div>
                </div>
                <div class="row">
                  <hr style="margin: 3px 10px;"/>
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Pause:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-break-hours" @input="checkInput" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-break-minutes" @input="checkInput" placeholder="mm" maxlength="2" size="2">
                    <span>h</span>
                  </div>
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Reise:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-travel-hours" @input="checkInput" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-travel-minutes" @input="checkInput" placeholder="mm" maxlength="2" size="2">
                    <span>h</span>
                  </div>
                </div>
                <div class="row">
                  <hr style="margin: 3px 10px;"/>
                </div>
                <div class="row">
                  <label class="col-xs-4 col-xs-offset-1 text-left">Insgesamt:</label>
                  <div class="col-xs-4 text-left">
                    <span>{{computedTime.hours}}:{{computedTime.minutes}} h</span>
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
  data: function (){
    return {
      computedTime: {
        minutes: "00",
        hours: "00",
      },
    };
  },
  computed: {
    "formattedDate": function () {
      return moment(this.$route.params.day).locale("de").format("DD.MMMM YYYY");
    },
  },
  methods: {
    checkInput: function (event) {
      var elem = event.target;
      var text = elem.value;

      if (text.match("[^0-9]") !== null) {
        elem.style.color = "red";
        return;
      }

      var num = parseInt(text);
      if (num > 23 || num < 0) {
        elem.style.color = "red";
        return;
      }

      //input validated
      elem.style.color = "";
/*
      //check if every input field has valid input
      for (var id in {"time-start-hours","time-start-minutes","time-stop-hours","time-stop-minutes","time-break-hours","time-break-minutes","time-travel-hours","time-travel-minutes"}) {
        console.log(id);
        var dom = document.getElementById(id);
        if (dom.style.color == "red") {
          return;
        }
      }
*/

      this.updateComputedTime();
    },
    updateComputedTime: function () {

      var readValue = function (id) {
        if (document.getElementById(id).value == "") {
          return 0;
        } else {
          return parseInt(document.getElementById(id).value);
        }
      };

      var moment1 = moment("2000-01-01");

      //set stop time
      moment1.hours(readValue("time-stop-hours"));
      moment1.minutes(readValue("time-stop-minutes"));

      //subtract start time
      moment1.subtract(readValue("time-start-hours"),'h')
      moment1.subtract(readValue("time-start-minutes"),'m')

      //substract break
      moment1.subtract(readValue("time-break-hours"),'h')
      moment1.subtract(readValue("time-break-minutes"),'m')

      //add travel time (half of it)
      moment1.add(readValue("time-travel-hours")/2,'h')
      moment1.add(readValue("time-travel-minutes")/2,'m')


      this.computedTime.minutes = moment1.format("mm");
      this.computedTime.hours = moment1.format("hh");

    }
  },
}
</script>

<style scoped>

  *[class^="col-sm-"], *[class^="col-xs-"] {
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

  label{
    padding-left: 15px !important;
  }
</style>
