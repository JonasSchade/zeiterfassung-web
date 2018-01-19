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
                  <hr style="margin: 3px 10px;" />
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
                  <hr style="margin: 3px 10px;" />
                </div>
                <div class="row">
                  <label class="col-xs-4 col-xs-offset-1 text-left">Insgesamt:</label>
                  <div class="col-xs-4 text-left">
                    <span>{{computedTime.hours}}:{{computedTime.minutes}} h</span>
                  </div>
                  <button id="btn_time" v-on:click="updateTimesFirst()">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    Zuteilen
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="card col-xs-10" >
          <div>
            <div class="row">
              <p>{{completeTime}} h</p>
              <p>{{assignedTime}} h</p>
              <p>{{unassignedTime}} h</p>
              <span class="text-left">So viel können sie noch verteilen</span>
              <span class="text-right">{{unassignedTime}} h</span>
            </div>
            <div class="progress">
              <div class="progress-bar progress-bar-success" role="progressbar" v-bind:aria-valuenow="unassignedTime"
              aria-valuemin="0" v-bind:aria-valuemax="{unassignedTime}" v-bind:style="{ width: (unassignedTime/completeTime)*100 + '%' }">{{unassignedTime}} h</div>
            </div>
            <div>
              <div class="row">
                <span class="text-left">So viel haben sie schon verteilt</span>
                <span class="text-right">{{assignedTime}} h</span>
              </div>
              <div class="progress">
                <div class="progress-bar progress-bar-success" role="progressbar" v-bind:aria-valuenow="assignedTime"
                aria-valuemin="0" v-bind:aria-valuemax="{assignedTime}" v-bind:style="{ width: (assignedTime/completeTime)*100 + '%' }">{{assignedTime}} h
              </div>
            </div>
            <div>
              <button id="btn_new_project">
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                Zeiten Speichern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <p>
      Tragen sie die Zeiten für die jeweiligen Projekte ein:
    </p>
  </div>
  <div v-for="project in projects" class="inputcontainer">
    <div class="containerheader">
      <h2>{{projects.name}}</h2>
    </div>
    <div class="containerbody">
      <div>
        <p>
          Beschreibung:
        </p>
        <span>
          {{projects.description}}
        </span>
        <br>
      </div>
      <br>
      Projektleiter:
      <span>
        {{projects.firstname}} {{projects.lastname}}
      </span>
      <br>
      <br>
      <div>
        Gib die Zeit ein:
        <input type="text" v-bind:id="project.id+'minutes'"  placeholder="hh" maxlength="2" size="2">
        <span>:</span>
        <input type="text" v-bind:id="project.id+'hours'" placeholder="mm" maxlength="2" size="2">
        <p></p>
        <div>
          <br>
          <button id="btn_new_project" v-on:click="addTime(id)">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Hinzufügen
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'dashboard-day-detail',
  data: function() {
    return {
      projects: [],
      computedTime: {
        minutes: "",
        hours: "",
      },
      projectTimes: [],
      completeTime: "",
      assignedTime: "",
      unassignedTime: ""
    };
  },
  created() {
    this.$http.get('http://localhost:3000/api/project/2', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.projects = response.body;
    });
  },
  computed: {
    "formattedDate": function() {
      return moment(this.$route.params.day).locale("de").format("DD.MMMM YYYY");
    },
  },
  methods: {
    save: function(event){
      return
    },
    addTime: function(event, id) {
      var getSum = function(total, num){
        return total + num;
      };

      var duration = parseInt($("#"+id+"hours").val())+parseInt(($("#"+this.id+"minutes").val())/60);
      this.projectTimes[this.id] = this.duration;
      updateTimes();
    },
    updateTimesFirst: function(event){
      this.completeTime = parseInt(this.computedTime.hours)+parseInt(this.computedTime.minutes)/60;
      this.unassignedTime = this.completeTime;
      this.assignedTime = this.completeTime-this.unassignedTime;
    },
    updateTimes: function(event){
      this.unassignedTime = this.unassignedTime;
      this.assignedTime= this.assignedTime;
    },
    checkInput: function (event) {
      var elem = event.target;
      var text = elem.value;

      if (elem.id.search("hours") == -1) {
        var ceeling = 60;
      } else {
        var ceeling = 23;
      };

      if (text.match("[^0-9]") !== null) {
        elem.style.color = "red";
        return;
      }

      var num = parseInt(text);
      if (num > ceeling || num < 0) {
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
  this.computedTime.hours = moment1.format("HH");

}
},
}
</script>

<style scoped>
.dashboard-day-detail {
  min-height: 100vh;
}

*[class^="col-sm-"],
*[class^="col-xs-"] {
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

.inputcontainer{
  border: 1px solid black;
  margin: 10px;
  padding: 5px;
}

.containerheader{
  color: white;
  background-color: #003452;
}

h3 {
  margin: 0px;
}

input {
  text-align: center;
}

label {
  padding-left: 15px !important;
}
</style>
