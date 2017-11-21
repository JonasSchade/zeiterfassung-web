<template>
  <div class="dashboard">
    <div class="hours">
      <div class="hoursOverview">
        <div class="row">
          <p class="label">Stunden Soll:</p>
          <p class="value">160</p>
        </div>
        <div class="row">
          <p class="label">Stunden Ist:</p>
          <p class="value">30</p>
        </div>
        <div class="row">
          <p class="label">Differenz:</p>
          <p class="value">130</p>
        </div>
      </div>
      <div class="hoursOverview">
        <div class="row">
          <p class="label">Stunden Soll:</p>
          <p class="value">160</p>
        </div>
        <div class="row">
          <p class="label">Stunden Ist:</p>
          <p class="value">30</p>
        </div>
        <div class="row">
          <p class="label">Differenz:</p>
          <p class="value">130</p>
        </div>
      </div>
    </div>
    <div id='calendar'></div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
}

//init calendar
$(document).ready(function() {
    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
      locale: 'de',
    })

});
</script>

<style scoped>
  #calendar {
    margin: 30px;
  }

  .hoursOverview {
    border: solid black 1px;
    margin: 10px;
    max-width: 300px;
    width: 30%;
    text-align: left;
  }

  .row {
    margin: 10px;
  }

  .label, .value {
    display: inline-block;
    margin: 0px;
  }
  .value {
    float: right;
  }
</style>
