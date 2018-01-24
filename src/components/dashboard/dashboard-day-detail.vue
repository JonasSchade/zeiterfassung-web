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
        <div class="col-sm-6 text-left day-input">
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
                    <input type="text" id="time-start-hours" @input="checkDayInput" v-model="startcomputed.hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-start-minutes" @input="checkDayInput" v-model="startcomputed.minutes" placeholder="mm" maxlength="2" size="2">
                    <span>Uhr</span>
                  </div>
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Bis:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-stop-hours" @input="checkDayInput" v-model="endcomputed.hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-stop-minutes" @input="checkDayInput" v-model="endcomputed.minutes" placeholder="mm" maxlength="2" size="2">
                    <span>Uhr</span>
                  </div>
                </div>
                <div class="row">
                  <hr style="margin: 3px 10px;" />
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Pause:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-break-hours" @input="checkDayInput" v-model="pausecomputed.hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-break-minutes" @input="checkDayInput" v-model="startcomputed.minutes" placeholder="mm" maxlength="2" size="2">
                    <span>h</span>
                  </div>
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Reise:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-travel-hours" @input="checkDayInput" v-model="travelcomputed.hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-travel-minutes" @input="checkDayInput" v-model="travelcomputed.minutes" placeholder="mm" maxlength="2" size="2">
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
                </div>
                <button class="center" id="btn_time" type="button" v-on:click="updateTimesFirst()" disabled>
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                  Zuteilen
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="card col-sm-6 overview" id="save">
          <div>
            <div class="row">
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
                <span class="text-right">{{projectTime}} h</span>
              </div>
              <div class="progress">
                <div class="progress-bar progress-bar-success" role="progressbar" v-bind:aria-valuenow="projectTime"
                aria-valuemin="0" v-bind:aria-valuemax="{completeTime}" v-bind:style="{ width: (projectTime/completeTime)*100 + '%' }">{{projectTime}} h
              </div>
            </div>
            <div>
              <button id="btn_save" v-on:click="save()">
                <i class="fa fa-floppy-o" aria-hidden="true" ></i>
                Zeiten Speichern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <p id="info">
      Tragen sie die Zeiten für die jeweiligen Projekte ein:
    </p>
    <b-alert variant="danger" class="col-sm-12"
         dismissible
         :show="this.showDismissibleAlert"
         @dismissed="enable()">
         Zu viel Zeit zugeteilt!
    </b-alert>
  </div>
  <div v-for="project in projects" :key="project.id" class="inputcontainer col-sm-12" id="inputs">
    <div class="containerheader">
      <h2>{{project.name}}</h2>
    </div>
    <div class="containerbody">
      <div>
        <p>
          Beschreibung:
        </p>
        <span>
          {{project.description}}
        </span>
        <br>
      </div>
      <br>
      <br>
      <div>
        Gib die Zeit ein:
        <input type="number" v-bind:id="project.id+'hours'" @input="checkProjectInput" v-model="projectComputedHours[projectid]" placeholder="hh" maxlength="2" size="2">
        <span>:</span>
        <input type="number" v-bind:id="project.id+'minutes'" @input="checkProjectInput" v-model="projectComputedMin[projectid]"placeholder="mm" maxlength="2" size="2">
        <p></p>
        <div>
          <br>
          <button id="btn_add" v-on:click="addTime(project.id)">
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
      userid: "",
      projects: [],
      computedTime: {
        minutes: "",
        hours: "",
      },
      completeTime: 0.0,
      date: this.$route.params.day,
      unassignedTime: 0.0,
      projectTime: 0.0,
      projectTimes: [],
      projectComputedMin: [],
      projectComputedHours: [],
      startingtime: "",
      endtime: "",
      pause: "",
      travel: "",
      showDismissibleAlert: false,
      update: false,
      startcomputed:{
        minutes: "",
        hours: "",
      },
      endcomputed:{
        minutes: "",
        hours: "",
      },
      pausecomputed:{
        minutes: "",
        hours: "",
      },
      travelcomputed:{
        minutes: "",
        hours: "",
      }
    };
  },
  created() {
    this.$http.get('http://localhost:3000/api/authenticate', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {

      this.userid = response.body.id;

      this.$http.get('http://localhost:3000/api/user_projects/'+this.userid, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(res1 => {
        this.projects = res1.body;

        this.$http.get('http://localhost:3000/api/times/'+this.userid+'/'+this.date, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(res2 => {
          if(res2.body != null){
            this.update=true;
            this.startingtime = res2.body[0].comming_time;
            this.endtime = res2.body[0].leaving_time;
            this.pause = res2.body[0].pause;
            this.travel = res2.body[0].travel;

            for(var i=0; i< this.projects.length; i++){
              if(this.projects[i] != null){
                this.$http.get('http://localhost:3000/api/project_time/'+this.userid+'/'+this.date+'/'+i, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(res3 => {
                  if(res3.body[i] != null){
                    this.projectTimes[i]=res3.body[i].duration;
                  }else{
                    this.projectTimes[i]=null;
                  }
                })
              }
            }
            this.compute();
            this.computeDuration();
          }
        })
      });
    });
  },
  computed: {
    "formattedDate": function() {
      return moment(this.$route.params.day).locale("de").format("DD.MMMM YYYY");
    },
  },
  methods: {
    save: function(event){
      if(this.completeTime == 0.0){
        return;
      }
      var datebody={
        date: this.date,
        userid: this.userid,
        comming_time: this.startingtime,
        leaving_time: this.endtime,
        pause: this.pause,
        travel: this.travel,
      };
      if(update == false){
        this.$http.post("http://localhost:3000/api/time/", datebody, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}})

        .then(response => {
          for(var i=0; i< this.projects.length; i++){
            if(this.projectTimes[i] != null){
              var projectbody={
                date: this.date,
                userid: this.userid,
                projectid: i,
                duration: this.projectTimes[i],
              };
              this.$http.post("http://localhost:3000/api/project_time/", projectbody, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}});
            }
          }
        });
      }else{
        this.$http.put("http://localhost:3000/api/time/"+datebody.userid+"/"+datebody.date, datebody, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}})

        .then(response => {
          for(var i=0; i< this.projects.length; i++){
            if(this.projectTimes[i] != null){
              var projectbody={
                date: this.date,
                userid: this.userid,
                projectid: i,
                duration: this.projectTimes[i],
              };
              this.$http.put("http://localhost:3000/api/project_time/"+projectbody.userid+"/"+projectbody.date+"/"+projectbody.prjectid, projectbody, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}});
            }
          }
        });
      }
    },
    compute: function(){
      this.startcomputed.hours=moment(this.startingtime).get('hour');
      this.startcomputed.minutes=moment(this.startingtime).get('minute');
      this.endcomputed.hours=moment(this.endtime).get('hour');
      this.endcomputed.minutes=moment(this.endtime).get('minute');
      this.pausecomputed.hours=Math.floor(this.pause);
      this.pausecomputed.minutes=Math.round((this.pause-Math.floor(this.pause))*60);
      this.travelcomputed.hours=Math.floor(this.travel);
      this.travelcomputed.minutes=Math.round((this.travel-Math.floor(this.travel))*60);
    },
    computeDuration: function(){
      for(var i=0; i<this.projectTimes.length; i++){
        if(this.projectTimes[i] > 0){
          this.projectComputedHours[i]=Math.floor(this.projectTimes[i]);
          this.projectComputedMin[i]=Math.round((this.projectTimes[i]-this.projectComputedHours[i])*60);
        }
      }
    },
    updateTimes: function(event){
      this.projectTime=0.0;
      this.unassignedTime=0.0;
      for(var i=0; i < this.projectTimes.length; i++){
        if(this.projectTimes[i] != null || !isNaN(this.projectTimes[i])){
          this.projectTime= this.projectTime+this.projectTimes[i];
        }
      }
      this.unassignedTime = this.completeTime-this.projectTime;
    },
    enable: function(){
      this.showDismissibleAlert=false;
      $('#btn_save').prop('disabled', false);
    },
    addTime: function(id) {
      var h = parseInt($("#"+id+"hours").val());
      var min;
      if($("#"+id+"minutes").val()==null){
        min = 0;
      }else{
        min = $("#"+id+"minutes").val();
      }
      min = min/60.0;
      min = parseFloat(min);
      var duration = parseFloat(min+h);

      if(this.projectTime+duration < this.completeTime){
        this.projectTimes[id] = duration;
        this.updateTimes();
      }else{
        if(this.showDismissibleAlert == false){
          this.showDismissibleAlert = true;
        }
        $('#btn_save').prop('disabled', true);
      }
    },
    updateTimesFirst: function(event){
      this.completeTime = parseFloat(this.computedTime.hours)+parseFloat(this.computedTime.minutes/60.0);
      this.unassignedTime = parseFloat(this.completeTime);

      this.startingtime = this.date + " " + $("#time-start-hours").val() + ":" + $("#time-start-minutes").val()+":00";
      this.endtime = this.date + " " + $("#time-stop-hours").val() + ":" + $("#time-stop-minutes").val()+":00";
      this.pause = $("#time-break-hours").val()+($("#time-break-minutes").val()/60.0);
      this.travel = $("#time-travel-hours").val()+($("#time-travel-minutes").val()/60.0);

      $("#save").show();
      $("#inputs").show();
      $("#info").show();
    },
    checkProjectInput: function (event) {
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

      if (this.projectTime > this.completeTime) {
        elem.style.color = "red";
        return;
      }

      if (this.projectTime > this.completeTime) {
        elem.style.color = "red";
        return;
      }
      //input validated
      elem.style.color = "";
    },
    checkDayInput: function (event) {
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


  if ($('#btn_time').prop('disabled')) {
      $('#btn_time').prop('disabled', false);
  }
}
}
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
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  margin-bottom: 30px;
  padding-left: 5px;
  padding-right: 5px;
}

.containerheader{
  text-align: left;
  background-color: #003452;
  padding: 20px;
  border: none;
  font-size: 18px;
  color: white;
  -webkit-box-shadow: 0px 0px 7px #ccc;
  box-shadow: 0px 0px 7px #ccc;
}

.containerbody{
  border-radius: 0px 0px 3px 3px;
  box-shadow: 0px 5px 7px #ccc;
  padding: 20px;
}

.overview{
  padding: 20px;
}

#info{
  display: none;
}

#save{
  display: none;
}

#inputs{
  display: none;
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
