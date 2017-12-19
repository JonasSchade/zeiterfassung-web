<template>
  <div class="arbeitsplaene">
  <router-link to="/administration/neuerArbeitsplan">
    <button id="btn_neuer_arbeitsplan"><i class="fa fa-plus" aria-hidden="true"></i> Neuer Arbeitsplan</button>
  </router-link>
  <div id="container">
    <ul id="example-1">
      <abteilungcontainer v-for="item in items" :key="item.abtname" :abteilung-name="item.abtname" :abteilung-leiter="item.abtleiter">

      </abteilungcontainer>
    </ul>
  </div>
  </div>
</template>

<script>
import arbeitsplancontainer from '@/components/administration/arbeitsplan/arbeitsplancontainer'
export default {
  name: 'arbeitsplaene',
}
</script>

<style scoped>
  .arbeitsplaene {
    height: 700px;
    text-align: center;
  }

  #btn_neuer_arbeitsplan {
    margin: 20px;
  }
  
  h1 {
    display: block;
    line-height: 700px;
  }
</style>
