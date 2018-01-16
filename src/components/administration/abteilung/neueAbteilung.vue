<template>
<div class="neueAbteilung">
  <div id="neueAbtDiv" class="center-block">
    <div id="app">
      <div class="topper">
        <div class="row">
          <div class="col-sm-4 text-left">
            <button v-on:click="$router.push('/administration/abteilungen')">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                Abteilungen
              </button>
          </div>
          <div class="col-sm-4">
            <h3>Neue Abteilung</h3>
          </div>
        </div>
      </div>
      <div class="form-group container-flex">
        <div class="row">
          <label class="col-sm-offset-1 col-sm-3 text-right" for="abtname">Abteilung:</label>
          <div class="col-sm-9">
            <input type="text" class="full-width" id="abtname" placeholder="Abteilungname" v-model="abtname">
          </div>
        </div>
        <div class="row">
          <label class="col-sm-offset-1 col-sm-3 text-right" for="LeiterSelect">Abteilungsleiter: </label>
          <div class="col-sm-9">
            <select v-model="selected" id="LeiterSelect">
              <option disabled value="">Wählen Sie einen Leiter aus!</option>
              <option v-for="option in options">
                {{ option.firstname }} {{option.lastname}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">

        </div>
        <div class="col-sm-9">
          <router-link to="/administration/abteilungen">
            <button class="btn_rechts"><i class="fa fa-check" aria-hidden="true" ></i> Abteilung anlegen</button>
            <button class="btn_rechts"><i class="fa fa-times" aria-hidden="true" ></i> Abbrechen</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'neueAbteilung',
  data: function() {
    return {
      abtname: "",
      selected: "",
      option: '',
      options: []
    };
  },
  created() {

    this.$http.get('http://localhost:3000/api/user').then(response => {
      this.options = response.body;
    });
  }
}
</script>

<style scoped>
.neueAbteilung {
  height: 700px;
  text-align: center;
}

.topper {
  margin-bottom: 20px;
}

.topper h3 {
  margin-bottom: 5px;
  margin-top: 5px;
}

#btn_close {
  position: absolute;
  font-size: 20px;
  right: 15px;
  top: 10px;
  box-shadow: none;
  color: #003452;
  background-color: white;
  padding: 5px 15px 5px 15px;
  border: 0;
}

#neueAbtDiv {
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  padding-left: 0px;
  padding-right: 0px;
  padding: 30px;
  text-align: left;
}

h3 {
  display: block;
  line-height: 50px;
}

.btn_rechts {
  margin-top: 30px;
  margin-bottom: 30px;
}

.container-flex .row {
  margin-top: 20px;
  margin-bottom: 20px;
}

.container-flex label {
  margin: 0px;
}

.col-sm-9{
  text-align: left;
}
</style>
