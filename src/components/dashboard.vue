<template>
  <div class="dashboard">
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

</style>
