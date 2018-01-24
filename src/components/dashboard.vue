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
                  <div class="col-xs-7"><span class="time-label">Stunden Soll:</span></div>
                  <div class="col-xs-5"><span class="time-value">{{monthTime}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-7"><span class="time-label">Stunden Ist:</span></div>
                  <div class="col-xs-5"><span class="time-value">{{monthWorkedTime}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-7"><span class="time-label">Differenz:</span></div>
                  <div class="col-xs-5"><span class="time-value">{{Math.round ((monthTime - monthWorkedTime)*10)/10}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="progress">
                      <div class="progress-bar progress-bar-success" role="progressbar" v-bind:aria-valuenow="monthWorkedTime"
                           aria-valuemin="0" v-bind:aria-valuemax="monthTime" v-bind:style="{ width: monthWorkedTime/monthTime*100 + '%' }"></div>
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
              <i class="fa fa-clock-o" aria-hidden="true"></i>Seit Jahresbeginn:
            </h4>
            <hr/>
            <div class="content">
              <div class="container-flex">
                <div class="row">
                  <div class="col-xs-7"><span class="time-label">Stunden Soll:</span></div>
                  <div class="col-xs-5"><span class="time-value">{{yearTime}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-7"><span class="time-label">Stunden Ist:</span></div>
                  <div class="col-xs-5"><span class="time-value">{{yearWorkedTime}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-7"><span class="time-label">Differenz:</span></div>
                  <div class="col-xs-5"><span class="time-value">{{Math.round ((yearTime - yearWorkedTime)*10)/10}} h</span></div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="progress">
                      <div class="progress-bar progress-bar-success" role="progressbar" v-bind:aria-valuenow="yearWorkedTime"
                           aria-valuemin="0" v-bind:aria-valuemax="yearTime" v-bind:style="{ width: yearWorkedTime/yearTime*100 + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4 text-right align-right align-bottom">
          <select id="calendar-select-month" v-on:change="calendarSelectChanged()">
            <option>Jan</option>
            <option>Feb</option>
            <option>Mär</option>
            <option>Apr</option>
            <option>Mai</option>
            <option>Jun</option>
            <option>Jul</option>
            <option>Aug</option>
            <option>Sep</option>
            <option>Okt</option>
            <option>Nov</option>
            <option>Dez</option>
          </select>
          <select id="calendar-select-year" v-on:change="calendarSelectChanged()"></select>
          <br/>
          <button id="calendar-btn-prev" v-on:click="calendarButtonPress('prev')"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
          <button id="calendar-btn-today" v-on:click="calendarButtonPress('today')">Heute</button>
          <button id="calendar-btn-next" v-on:click="calendarButtonPress('next')"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
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
  created() {
    this.$http.get("http://localhost:3000/api/authenticate", {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      this.userid = response.body.id;

      var component = this;
      $(document).ready(() => {
        //init calendar
        $('#calendar').fullCalendar({
          locale: 'de',
          showNonCurrentDates: false,
          height: "auto",
          header: false,
          fixedWeekCount: false,
          dayRender: (date,cell) => {

            //don't change any days out of current month
            if ($(cell).get(0).className.indexOf("fc-disabled-day") !== -1) {
              return;
            }
            //background weekends:
            if (($(cell).get(0).className.indexOf("fc-sun") !== -1 || $(cell).get(0).className.indexOf("fc-sat") !== -1) && $(cell).get(0).className.indexOf("fc-today") == -1) {
              cell.css("background-color", "#e3f8fc");
            }

            //TODO: background holidays

            var dateStr = date.format("YYYY-MM-DD");

            this.$http.get('http://localhost:3000/api/time_worked_day/'+this.userid+"/"+dateStr, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response2 => {

              this.monthWorkedTime = this.monthWorkedTime + response2.body.hours;

              //show indicator if user has hours registert on that day
              if(response2.body.sum>0) {
                $(cell).append("<div class='hidden-xs cellIndicatorConatiner'></div>");
                $(cell).append("<div class='hidden-sm hidden-md hidden-lg hidden-xl cellTextConatiner'></div>");

                $(cell).find(".cellTextConatiner").append("<h4>"+response2.body.sumFormatted+"</h4>")

                if (response2.body.hours > 8) {
                  var dif = response2.body.hours - 8;
                  var max = (8/dif) * response2.body.hours;

                  $(cell).find(".cellIndicatorConatiner").radialIndicator({
                    barColor: '#5cb85c',
                    radius: 36,
                    barWidth: 3,
                    roundCorner : true,
                    format: () => {
                      return response2.body.sumFormatted;
                    },
                    initValue: response2.body.hours,
                    minValue: 0,
                    maxValue: max,
                    barBgColor: '#0062a7',
                    roundCorner: true,
                  });

                  $(cell).find(".cellTextConatiner").find("h4").css("color","#5cb85c");
                } else {
                  $(cell).find(".cellIndicatorConatiner").radialIndicator({
                    barColor: '#0062a7',
                    radius: 36,
                    barWidth: 3,
                    roundCorner : true,
                    format: () => {
                      return response2.body.sumFormatted;
                    },
                    initValue: response2.body.hours,
                    minValue: 0,
                    maxValue: 8,
                  });

                  $(cell).find(".cellTextConatiner").find("h4").css("color","#0062a7");
                }

              }
            });

          },
          dayClick: (date, jsEvent, view) => {
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

      });
    });

  },
  data() {
    return {
      monthTime: 0,
      monthWorkedTime: 0,
      yearTime: 1700,
      yearWorkedTime: 0,
      userid: Number,
      token: 0
    };
  },
  methods: {
    //performs given action of calendar button
    calendarButtonPress(action) {
      this.monthWorkedTime = 0;

      $('#calendar').fullCalendar(action);
      this.calendarUpdateControls();
    },
    //changes Date of calendar based on selected values
    calendarSelectChanged() {
      this.monthWorkedTime = 0;

      var dateString = $("#calendar-select-year")[0].value;
      dateString = dateString.concat("-");
      dateString = dateString.concat(("0" + ($("#calendar-select-month")[0].selectedIndex+1)).slice(-2));
      dateString = dateString.concat("-01");

      $('#calendar').fullCalendar('gotoDate', dateString);
      this.calendarUpdateControls();
    },
    //updates buttons (disable/enable) and selects based on current date of calendar
    calendarUpdateControls() {
      var month = $("#calendar").fullCalendar("getDate")._d.getMonth();
      var year = $("#calendar").fullCalendar("getDate")._d.getFullYear();

      //update selects
      $("#calendar-select-month")[0].selectedIndex = month;
      $("#calendar-select-year")[0].value = year;

      //disable buttons if nedded
      $("#calendar-btn-prev")[0].disabled = ($("#calendar-select-month")[0].selectedIndex == 0 && $("#calendar-select-year")[0].selectedIndex == 0);
      $("#calendar-btn-next")[0].disabled = ($("#calendar-select-month")[0].selectedIndex == $("#calendar-select-month")[0].length -1 && $("#calendar-select-year")[0].selectedIndex == $("#calendar-select-year")[0].length -1);
      $("#calendar-btn-today")[0].disabled = $('#calendar').find('td.fc-today').length !== 0;

      this.updateMonthTime(month, year);
      this.updateYearTime(year);
    },
    updateMonthTime(month, year) {

      var date = moment().year(year).month(month).date(1);

      var cur = date.clone().startOf('month');
      var last = date.clone().endOf('month');

      var workdays = 0;

      while (cur.isSameOrBefore(last)) {
        if (cur.weekday() != 0 && cur.weekday() != 6){
          workdays = workdays+1;
        }
        cur.add(1,"days");
      }

      this.monthTime= workdays*8;
    },
    updateYearTime(year) {
      var workedTime = 0.0;
      this.$http.get('http://localhost:3000/api/time_of_year/'+this.userid+"/"+year, {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
        this.yearWorkedTime = response.body.sum || 0;
      });

    }
  },
}
</script>

<style scoped>

  .dashboard div[class^="col-sm-"] {
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

  .card>.content>.container-flex>.row {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .card>.content>.container-flex>.row>.col-xs-7 {
    text-align: left;
  }

  .card>.content>.container-flex>.row>.col-xs-5 {
    text-align: right;
  }

  .time-label {
    padding-left: 10px;
  }

  .time-value  {
    padding-right: 10px;
  }

  .progress {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 0px;
    margin-top: 5px;
  }

  .dashboard>.container>.row {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 0px;
    margin-right: 0px;
  }


  /*********************************
      CALENDAR-CONTROLS
   *********************************/
   select {
     font-size: 180%;
     margin-bottom: 5px;
     margin-left: 5px;
   }
</style>
<style>

  .cellTextConatiner, .cellIndicatorConatiner {
    height: 100%;
    padding: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cellTextConatiner *, .cellIndicatorConatiner * {
    margin: 0px;
  }
</style>
