<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <h4 class="header">
              <i class="fa fa-clock-o" aria-hidden="true"></i>Aktueller Monat:
            </h4>
            <hr/>
            <div class="content">
              <div class="container-flex">
                <div class="row">
                  <div class="col-sm-6"><span class="timelabel">Stunden Soll:</span></div>
                  <div class="col-sm-6"><span class="timevalue">{{monthTime[0]}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-sm-6"><span class="timelabel">Stunden Ist:</span></div>
                  <div class="col-sm-6"><span class="timevalue">{{monthTime[1]}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-sm-6"><span class="timelabel">Differenz:</span></div>
                  <div class="col-sm-6"><span class="timevalue">{{Math.round ((monthTime[0] - monthTime[1])*10)/10}} h</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <h4 class="header">
              <i class="fa fa-clock-o" aria-hidden="true"></i>Gleitzeit:
            </h4>
            <hr/>
            <div class="content">
              <div class="container-flex">
                <div class="row">
                  <div class="col-sm-6"><span class="timelabel">Soll:</span></div>
                  <div class="col-sm-6"><span class="timevalue">{{flexTime[0]}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-sm-6"><span class="timelabel">Ist:</span></div>
                  <div class="col-sm-6"><span class="timevalue">{{flexTime[1]}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-sm-6"><span class="timelabel">Differenz:</span></div>
                  <div class="col-sm-6"><span class="timevalue">{{Math.round ((flexTime[0] - flexTime[1])*10)/10}} h</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="calendar-controls">
            <button v-on:click="calendarButtonPress('prev')"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
            <button id="calendar-btn-today" v-on:click="calendarButtonPress('today')">Heute</button>
            <button v-on:click="calendarButtonPress('next')"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
            <h4>{{calendarCurrentMonth}}</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div id='calendar'></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  created: function () {
    //init calendar
    $(document).ready(function() {
      $('#calendar').fullCalendar({
        locale: 'de',
        header: false,
      });
      $("#calendar-btn-today").click();
    });
  },
  data: function () {
    return {
      monthTime: [160,128.7],
      flexTime: [1634.6,1283.4],
      calendarCurrentMonth: 'error_init',
    };
  },
  methods: {
    calendarButtonPress: function(action) {
      $('#calendar').fullCalendar(action);
      this.updateCurrentMonth();
    },
    updateCurrentMonth: function() {
      if (typeof $("#calendar").fullCalendar("getDate").startOf !== 'undefined') {
        this.calendarCurrentMonth = $("#calendar").fullCalendar("getDate").startOf("month").format('MMMM YYYY');
      } else {
        this.calendarCurrentMonth = "error";
      }
    }
  },
}
</script>

<style scoped>

  h4>i {
    padding-right: 7px;
  }

  .dashboard .col-sm-4 {
    padding: 1%;
  }

  .dashboard>.container>.row {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .card {
    background-color: white;
    border-radius: 2px;
    box-shadow: 0px 0px 7px #ccc;
  }

  .card>.header {
    text-align: left;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    /*
    background-color: #003452;
    color: white;
    */
    color: #282828;
    background-color: white;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
  }

  .calendar-controls {
    background-color: #F2F2F2;
    height: 100%;
  }

  .card>hr {
    margin: 0px;
  }

  .card>.content {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .content>.container-flex>.row {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .col-sm-6:first-child {
    text-align: left;
  }

  .col-sm-6:last-child {
    text-align: right;
  }

  .timelabel {
    padding-left: 10px;
  }
  .timevalue  {
    padding-right: 10px;
  }

  .fc-header-toolbar {
    height: 0px !important;
    margin: 0px !important;
  }

</style>
