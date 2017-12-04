<template>
  <div class="abteilungen">
    <router-link to="/administration/neueAbteilung">
      <button id="btn_neue_abteilung"><i class="fa fa-plus" aria-hidden="true"></i> Neue Abteilung</button>
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
import abteilungcontainer from '@/components/administration/abteilung/abteilungcontainer'
export default {
  name: 'abteilungen',
  components: {abteilungcontainer},
  methods: {

  },
  data: function() {
    return {
      items: [
        { abtname: 'Abt 1', abtleiter: 'Hans Mayer' },
        { abtname: 'Abt 2', abtleiter: 'Max Mustermann' }
      ],
    }
  }
}
</script>

<style scoped>
.abteilungen {
  height: 700px;
  text-align: center;
}

button {
  box-shadow: 1px 1px 4px #ccc;
  color: #282828;
  background-color: white;
  padding: 5px 15px 5px 15px;
  border: 1px solid #ccc;
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
  line-height: 100px;
}
</style>
