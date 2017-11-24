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
                  <div class="col-xs-6"><span class="timelabel">Stunden Soll:</span></div>
                  <div class="col-xs-6"><span class="timevalue">{{monthTime[0]}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-6"><span class="timelabel">Stunden Ist:</span></div>
                  <div class="col-xs-6"><span class="timevalue">{{monthTime[1]}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-6"><span class="timelabel">Differenz:</span></div>
                  <div class="col-xs-6"><span class="timevalue">{{Math.round ((monthTime[0] - monthTime[1])*10)/10}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="progress">
                      <div class="progress-bar progress-bar-success" role="progressbar" v-bind:aria-valuenow="monthTime[1]"
                           aria-valuemin="0" v-bind:aria-valuemax="monthTime[0]" v-bind:style="{ width: monthTime[1]/monthTime[0]*100 + '%' }"></div>
                    </div>
                  </div>
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
                  <div class="col-xs-6"><span class="timelabel">Stunden Soll:</span></div>
                  <div class="col-xs-6"><span class="timevalue">{{flexTime[0]}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-6"><span class="timelabel">Stunden Ist:</span></div>
                  <div class="col-xs-6"><span class="timevalue">{{flexTime[1]}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-6"><span class="timelabel">Differenz:</span></div>
                  <div class="col-xs-6"><span class="timevalue">{{Math.round ((flexTime[0] - flexTime[1])*10)/10}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="progress">
                      <div class="progress-bar progress-bar-success" role="progressbar" v-bind:aria-valuenow="flexTime[1]"
                           aria-valuemin="0" v-bind:aria-valuemax="flexTime[0]" v-bind:style="{ width: flexTime[1]/flexTime[0]*100 + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div id="calendar-controls">
            <button id="calendar-btn-prev" v-on:click="calendarButtonPress('prev')"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
            <button id="calendar-btn-today" v-on:click="calendarButtonPress('today')">Heute</button>
            <button id="calendar-btn-next" v-on:click="calendarButtonPress('next')"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
            <br/>
              <select id="calendar-select-month" v-on:change="calendarSelectChanged()">
                <option>Januar</option>
                <option>Februar</option>
                <option>März</option>
                <option>April</option>
                <option>Mai</option>
                <option>Juni</option>
                <option>Juli</option>
                <option>August</option>
                <option>September</option>
                <option>Oktober</option>
                <option>November</option>
                <option>Dezember</option>
              </select>
              <select id="calendar-select-year" v-on:change="calendarSelectChanged()">
              </select>
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
    var component = this;
    $(document).ready(function() {
      //init calendar
      $('#calendar').fullCalendar({
        locale: 'de',
        header: false,
        dayClick: function(date, jsEvent, view) {
          component.$router.push("/dashboard/day/"+date.format());
        },
      });

      //add options to year select
      var curYear = new Date().getFullYear();
      for (var i = curYear - 1; i < curYear + 2; i++) {
        var option = document.createElement("option");
        option.text = i.toString();
        option.data = i;
        document.getElementById('calendar-select-year').add(option,i);
      }

      //init calendar controls
      component.calendarUpdateControls();

      /*
      var col = $('#calendar-controls').parent();
      col.css('margin-top', col.parent().height() - (col.height() + parseInt(col.css('padding-top')) + parseInt(col.css('padding-bottom'))));
      */
    });
  },
  data: function () {
    return {
      monthTime: [160,128.7],
      flexTime: [1000,700],
    };
  },
  methods: {
    //performs given action of calendar button
    calendarButtonPress: function(action) {
      $('#calendar').fullCalendar(action);
      this.calendarUpdateControls();
    },
    //changes Date of calendar based on selected values
    calendarSelectChanged: function() {
      var dateString = $("#calendar-select-year")[0].value;
      dateString = dateString.concat("-");
      dateString = dateString.concat(("0" + ($("#calendar-select-month")[0].selectedIndex+1)).slice(-2));
      dateString = dateString.concat("-01");

      $('#calendar').fullCalendar('gotoDate', dateString);

      this.calendarUpdateControls();
    },
    //updates buttons (disable/enable) and selects based on current date of calendar
    calendarUpdateControls: function() {
      var month = $("#calendar").fullCalendar("getDate")._d.getMonth();
      var year = $("#calendar").fullCalendar("getDate")._d.getFullYear();

      //update selects
      $("#calendar-select-month")[0].selectedIndex = month;
      $("#calendar-select-year")[0].value = year;

      //disable buttons if nedded
      $("#calendar-btn-prev")[0].disabled = ($("#calendar-select-month")[0].selectedIndex == 0 && $("#calendar-select-year")[0].selectedIndex == 0);
      $("#calendar-btn-next")[0].disabled = ($("#calendar-select-month")[0].selectedIndex == $("#calendar-select-month")[0].length -1 && $("#calendar-select-year")[0].selectedIndex == $("#calendar-select-year")[0].length -1);
      $("#calendar-btn-today")[0].disabled = $('#calendar').find('td.fc-today').length !== 0;

    }
  },
}
</script>

<style scoped>

  h4>i {
    padding-right: 7px;
  }

  .dashboard .col-sm-4 {
    padding: 5px;
  }

  .dashboard>.container>.row {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 0px;
    margin-right: 0px;
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

  .col-xs-6:first-child {
    text-align: left;
  }

  .col-xs-6:last-child {
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

  #calendar-controls>button {
    border: 1px solid #ccc;
    box-shadow: 1px 1px 4px #ccc;
    color: #282828;
    background-color: white;
    padding: 5px 15px 5px 15px;
  }

  #calendar-controls>h3 {
    color:  #282828;
  }

  #calendar-controls>button:hover {
    background-color: rgb(245,245,245);
  }

  #calendar-controls>button:disabled {
    box-shadow: none;
    border: 1px solid #dcdcdc;
    background-color: #dcdcdc;
    color: #a4a4a4;
  }

  .col-sm-12 {
    padding: 5px;
  }

  .progress {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 0px;
    margin-top: 5px;
  }

  select{
    margin: 10px;
    margin-top: 10px;
    font-size: 180%;
    color: black;
    border: none;
    border-bottom: lightgrey 1px solid;
  }
</style>
