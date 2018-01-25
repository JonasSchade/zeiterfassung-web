<template>
  <div class="dashboard-day-detail">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 text-left">
          <button v-on:click="$router.push('/dashboard/')">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            Dashboard
          </button>
        </div>
        <div class="col-sm-4">
          <h3>{{ formattedDate }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 text-center day-input">
          <div class="card">
            <h4 class="header">
              <i class="fa fa-clock-o" aria-hidden="true"></i>Arbeitszeiten:
            </h4>
            <hr>
            <div class="content">
              <form class="container-flex">
                <div class="row">
                  <label class="col-xs-2 text-left">Von:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-start-hours" @input="checkTimesInput" v-model="startInput.hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-start-minutes" @input="checkTimesInput" v-model="startInput.minutes" placeholder="mm" maxlength="2" size="2">
                    <span>Uhr</span>
                  </div>
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Bis:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-stop-hours" @input="checkTimesInput" v-model="stopInput.hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-stop-minutes" @input="checkTimesInput" v-model="stopInput.minutes" placeholder="mm" maxlength="2" size="2">
                    <span>Uhr</span>
                  </div>
                </div>
                <div class="row">
                  <hr style="margin: 3px 10px;">
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Pause:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-break-hours" @input="checkTimesInput" v-model="pauseInput.hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-break-minutes" @input="checkTimesInput" v-model="pauseInput.minutes" placeholder="mm" maxlength="2" size="2">
                    <span>h</span>
                  </div>
                </div>
                <div class="row">
                  <label class="col-xs-2 text-left">Reise:</label>
                  <div class="col-xs-10 text-left">
                    <input type="text" id="time-travel-hours" @input="checkTimesInput" v-model="travelInput.hours" placeholder="hh" maxlength="2" size="2">
                    <span>:</span>
                    <input type="text" id="time-travel-minutes" @input="checkTimesInput" v-model="travelInput.minutes" placeholder="mm" maxlength="2" size="2">
                    <span>h</span>
                  </div>
                </div>
                <div class="row">
                  <hr style="margin: 3px 10px;">
                </div>
                <div class="row">
                  <label class="col-xs-offset-1 col-xs-4">Insgesamt:</label>
                    <span class="col-xs-4" style="line-height:28px;">{{computedTime.hours}}:{{computedTime.minutes}} h</span>
                </div>
                <button class="center" type="button" v-on:click="confirmTimes()">
                  <i class="fa fa-check" aria-hidden="true"></i>
                  Bestätigen
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-6 text-center day-input">
          <div class="card">
            <h4 class="header">
              <i class="fa fa-clock-o" aria-hidden="true"></i>Projekte:
            </h4>
            <hr>
            <div class="content">
              <form class="container-flex">
                <div class="row">
                  <div class="col-xs-12">
                    {{minutesToFormatString(usedMinutes)}} / {{minutesToFormatString(totalMinutes)}}
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="progress">
                      <div v-bind:class="[usedMinutes > totalMinutes ? 'progress-bar-danger' : 'progress-bar-success', 'progress-bar']" role="progressbar" v-bind:aria-valuenow="usedMinutes"
                           aria-valuemin="0" v-bind:aria-valuemax="totalMinutes" v-bind:style="{ width: usedMinutes/totalMinutes*100 + '%' }"></div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <hr style="margin: 3px 10px;">
                </div>
                <div class="row" v-for="p in projects">
                  <label class="col-xs-8 text-left">{{p.name}}</label>
                  <span class="col-xs-4 text-right">{{minutesToFormatString(projectMinutes[p.id])}}</span>
                  <div class="col-xs-12">
                    <input type="range" min="0" step="5" :max="totalMinutes" v-on:change="rangeChange($event, p.id)" :value="projectMinutes[p.id] || 0" class="slider">
                  </div>
                </div>
                <div class="row">
                  <hr style="margin: 3px 10px;">
                </div>
                <button class="center" type="button" v-on:click="confirmProjects()" :disabled='usedMinutes > totalMinutes'>
                  <i class="fa fa-check" aria-hidden="true"></i>
                  Bestätigen
                </button>
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
  data: function() {
    return {
      userid: "",
      date: this.$route.params.day,
      projects: [],
      update: false,

      computedTime: {
        minutes: "",
        hours: "",
      },

      totalMinutes: 0,
      usedMinutes: 0,
      projectMinutes: {},
      startInput:{
        minutes: "",
        hours: "",
      },
      stopInput:{
        minutes: "",
        hours: "",
      },
      pauseInput:{
        minutes: "",
        hours: "",
      },
      travelInput:{
        minutes: "",
        hours: "",
      },
      startMoment: {},
      stopMoment: {},
      pauseMoment: {},
      travelMoment: {},
    };
  },
  created() {
    this.$http.get('http://localhost:3000/api/authenticate', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {

      this.userid = response.body.id;

      this.$http.get('http://localhost:3000/api/user_projects/'+this.userid, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(res1 => {
        this.projects = res1.body;

        this.$http.get('http://localhost:3000/api/times/'+this.userid+'/'+this.date, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(res2 => {
          if(res2.body.length != 0) {

            this.writeOldValues(res2);
          }
        });

      });
    });

  },
  mounted() {
    this.updateComputedTime();
  },
  computed: {
    "formattedDate": function() {
      return moment(this.$route.params.day).locale("de").format("DD.MMMM YYYY");
    },
  },
  methods: {
    confirmProjects() {
      this.sendHTTP();
    },
    confirmTimes(event) {
      if (this.pauseInput.minutes == "") {
        this.pauseInput.minutes = 0;
      };
      if (this.pauseInput.hours == "") {
        this.pauseInput.hours = 0;
      };
      if (this.travelInput.minutes == "") {
        this.travelInput.minutes = 0;
      };
      if (this.travelInput.hours == "") {
        this.travelInput.hours = 0;
      };

      this.startMoment = moment(this.$route.params.day).hours(this.startInput.hours).minutes(this.startInput.minutes);
      this.stopMoment = moment(this.$route.params.day).hours(this.stopInput.hours).minutes(this.stopInput.minutes);
      this.pauseMoment = moment.duration({minutes: this.pauseInput.minutes, hours: this.pauseInput.hours});
      this.travelMoment = moment.duration({minutes: this.travelInput.minutes, hours: this.travelInput.hours});

      var diff = moment.duration(this.stopMoment.diff(this.startMoment));

      diff = diff.subtract(this.pauseMoment);
      diff = diff.add(this.travelMoment / 2);
      this.totalMinutes = diff.asMinutes();

    },
    checkTimesInput(event) {
      var elem = event.target;
      var text = elem.value;

      if (elem.id.search("hours") == -1) {
        var ceeling = 59;
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

      this.updateComputedTime();
    },
    updateComputedTime() {

      //subtract start time
      var start = moment(this.$route.params.day).hours(this.startInput.hours).minutes(this.startInput.minutes);
      var stop = moment(this.$route.params.day).hours(this.stopInput.hours).minutes(this.stopInput.minutes);

      var pause = moment.duration({minutes: this.pauseInput.minutes, hours: this.pauseInput.hours});
      var travel = moment.duration({minutes: this.travelInput.minutes, hours: this.travelInput.hours});

      var diff = moment.duration(stop.diff(start));

      diff = diff.subtract(pause);
      diff = diff.add(travel / 2);

      this.computedTime.minutes = diff.minutes()
      this.computedTime.hours = diff.hours();
    },
    sum(obj) {
      var sum = 0;
      for( var el in obj ) {
        if( obj.hasOwnProperty( el ) ) {
          sum += parseFloat( obj[el] );
        }
      }
      return sum;
    },
    rangeChange(event, pid) {



      this.projectMinutes[pid] = event.target.value;
      this.$mount();

      this.usedMinutes = this.sum(this.projectMinutes);

    },
    minutesToFormatString(minutes) {
      var dur = moment.duration(parseInt(minutes) || 0, 'minutes');
      var h = dur.hours();
      var m = dur.minutes();

      return ((h < 10?'0':'') + h + ":" + (m < 10?'0':'') + m+"h");
    },
    sendHTTP() {

      if (this.update) {
        this.sendHTTP_PUT();
        return;
      }

      var body = {
        date: this.$route.params.day,
        userid: this.userid,
        comming_time: this.startMoment.format("YYYY-MM-DD HH:mm:ss"),
        leaving_time: this.stopMoment.format("YYYY-MM-DD HH:mm:ss"),
        pause: this.pauseMoment.asHours(),
        travel: this.travelMoment.asHours(),
      };

      var len = Object.keys(this.projectMinutes).length;
      var i = 0;

      this.$http.post("http://localhost:3000/api/time/", body, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
        i = i + 1;
        if (i == len){ //make sure all requests are through
          this.$router.push('/dashboard');
        }
      });

      for (var pid in this.projectMinutes) {
        if (this.projectMinutes.hasOwnProperty(pid)) {

          var d = moment.duration(parseInt(this.projectMinutes[pid]), 'minutes').asHours();

          var body = {
            date: this.$route.params.day,
            userid: this.userid,
            projectid: pid,
            duration: d
          }

          this.$http.post("http://localhost:3000/api/project_time/", body, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
            i = i+1;
            if (i == len){ //make sure all requests are through
              this.$router.push('/dashboard');
            }
          });

        }
      }
    },
    sendHTTP_PUT() {

      var body = {
        comming_time: this.startMoment.format("YYYY-MM-DD HH:mm:ss"),
        leaving_time: this.stopMoment.format("YYYY-MM-DD HH:mm:ss"),
        pause: this.pauseMoment.asHours(),
        travel: this.travelMoment.asHours(),
      };

      var len = Object.keys(this.projectMinutes).length;
      var i = 0;

      this.$http.put("http://localhost:3000/api/time/"+this.userid+"/"+this.$route.params.day, body, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
        i = i+1;
        if (i == len){ //make sure all requests are through
          this.$router.push('/dashboard');
        }
      });

      for (var pid in this.projectMinutes) {
        if (this.projectMinutes.hasOwnProperty(pid)) {

          var d = moment.duration(parseInt(this.projectMinutes[pid]), 'minutes').asHours();

          var body = {
            date: this.$route.params.day,
            userid: this.userid,
            duration: d
          }

          this.$http.put("http://localhost:3000/api/project_time/"+this.userid+"/"+this.$route.params.day+"/"+pid, body, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
            i = i+1;
            if (i == len){ //make sure all requests are through
              this.$router.push('/dashboard');
            }
          });

        }
      }
    },
    writeOldValues(res) {
      this.update = true;

      this.startInput.hours = moment(res.body[0].comming_time).hours();
      this.startInput.minutes = moment(res.body[0].comming_time).minutes();
      this.stopInput.hours = moment(res.body[0].leaving_time).hours();
      this.stopInput.minutes = moment(res.body[0].leaving_time).minutes();
      this.pauseInput.hours =  moment.duration(res.body[0].pause, 'hours').hours();
      this.pauseInput.minutes =  moment.duration(res.body[0].pause, 'hours').minutes();
      this.travelInput.hours = moment.duration(res.body[0].travel, 'hours').hours();
      this.travelInput.minutes = moment.duration(res.body[0].travel, 'hours').minutes();

      this.updateComputedTime();
      this.confirmTimes();

      for (var i = 0; i < this.projects.length; i++) {
        this.$http.get('http://localhost:3000/api/project_time/'+this.userid+'/'+this.date+'/'+this.projects[i].id, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(res3 => {
          var pid = res3.url.replace("http://localhost:3000/api/project_time","").replace(/\/[0-9]*\//i,"").replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}\//i,"");
          this.projectMinutes[pid] = moment.duration(res3.body[0].duration, 'hours').asMinutes();
          this.$mount();
          this.usedMinutes = this.sum(this.projectMinutes);
        });
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
  /* position: relative; */
  max-width: 800px;
  /* top: 20px; */
  /* bottom: 20px; */
  display: block;
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

.inputs{
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
