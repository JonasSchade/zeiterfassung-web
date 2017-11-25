<template>
  <div class="dashboard-day-detail">
    <div class="container">
      <div class="row heading">
        <div class="col-sm-3">
          <button v-on:click="$router.push('/dashboard/')">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            Dashboard
          </button>
        </div>
        <div class="col-sm-6">
          <h3>{{ formatedDate }}</h3>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'dashboard-day-detail',

  computed: {
    "formatedDate": function () {
      return moment(this.$route.params.day).locale("de").format("DD.MMMM YYYY");
    },
  },
}
</script>

<style scoped>
  .dashboard-day-detail {
    height: 700px;
    text-align: center;
  }

  .row {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .col-sm-6, .col-sm-3 {
    padding: 5px;
  }

  button {
    float: left;
  }

  .heading button {
    border: 1px solid #ccc;
    box-shadow: 1px 1px 4px #ccc;
    color: #282828;
    background-color: white;
    padding: 5px 15px 5px 15px;
  }

  .heading button:hover {
    background-color: rgb(245,245,245);
  }

  .heading button:disabled {
    box-shadow: none;
    border: 1px solid #dcdcdc;
    background-color: #dcdcdc;
    color: #a4a4a4;
  }

  .heading h3 {
    margin: 0px;
  }
</style>
