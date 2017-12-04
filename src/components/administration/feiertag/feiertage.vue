<template>
  <div class="feiertage">
  <router-link to="/administration/neuerFeiertag">
    <button id="btn_neuer_feiertag"><i class="fa fa-plus" aria-hidden="true"></i> Neuer Feiertag</button>
  </router-link>
  </div>
</template>

<script>
import feiertagcontainer from '@/components/administration/feiertag/feiertagcontainer'
export default {
  name: 'feiertage',
}
</script>

<style scoped>
  .feiertage {
    height: 700px;
    text-align: center;
  }

  #btn_neuer_feiertag {
    margin: 20px;
  }

  button:hover {
    background-color: rgb(245, 245, 245);
  }
</style>
