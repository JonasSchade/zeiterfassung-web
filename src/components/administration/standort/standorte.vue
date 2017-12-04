<template>
  <div class="standorte">
  <router-link to="/administration/neuerStandort">
    <button id="btn_neuer_Standort"><i class="fa fa-plus" aria-hidden="true"></i> Neuer Standort</button>
  </router-link>
  </div>
</template>

<script>
export default {
  name: 'standorte',
}
</script>

<style scoped>
  .standorte {
    height: 700px;
    text-align: center;
  }

  #btn_neuer_standort {
    margin: 20px;
  }

  button:hover {
    background-color: rgb(245, 245, 245);
  }
</style>
