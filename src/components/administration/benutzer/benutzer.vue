<template>
  <div class="benutzer">
  <router-link to="/administration/neuerbenutzer">
    <button id="btn_neuer_benutzer"><i class="fa fa-plus" aria-hidden="true"></i> Neuer Benutzer</button>
  </router-link>
  </div>
</template>

<script>
import benutzercontainer from '@/components/administration/benutzer/benutzercontainer'
export default {
  name: 'benutzer',
}
</script>

<style scoped>
  .benutzer {
    height: 700px;
    text-align: center;
  }

  #btn_neuer_benutzer {
    margin: 20px;
  }
</style>
