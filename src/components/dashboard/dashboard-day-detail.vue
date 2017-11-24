<template>
  <div class="dashboard-day-detail">
    <h1>Day: {{ $route.params.day }}</h1>
  </div>
</template>

<script>
export default {
  name: 'dashboard-day-detail',
}
</script>

<style scoped>
  .dashboard-day-detail {
    height: 700px;
    text-align: center;
  }

  h1 {
    display: block;
    line-height: 700px;
  }
</style>
