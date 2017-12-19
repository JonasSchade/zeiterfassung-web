<template>
  <div class="laender">
  <router-link to="/administration/neuesLand">
    <button id="btn_neues_land"><i class="fa fa-plus" aria-hidden="true"></i> Neues Land</button>
  </router-link>
  <ul id="example-1">
    <li v-for="item in items" style="list-style-type:none">
      {{item}}
    </li>
  </ul>
  </div>
</template>

<script>
import landcontainer from '@/components/administration/land/landcontainer'
export default {
  name: 'laender',
  methods: {

  },
  data: function(){
    return {items: [
        'Germany',
        'Austria',
        'Bavaria'
      ]}
    }
  }
</script>

<style scoped>
  .laender {
    height: 700px;
    text-align: center;
  }

  #btn_neue_abteilung {
    margin: 20px;
  }

  button:hover {
    background-color: rgb(245, 245, 245);
  }

  .abteilung_box {
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
    padding-left: 0px;
    padding-right: 0px;
    padding: 20px;
  }

  h1 {
    display: block;
    line-height: 700px;
  }
</style>
