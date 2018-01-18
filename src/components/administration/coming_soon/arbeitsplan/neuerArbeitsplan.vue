<template>
  <div class="neuerArbeitsplan">
    <div id="neuerArbeitsplanDiv" class="center-block">
      <div id="app">
      <h3>
        Neuen Arbeittsplan anlegen
      </h3>
      <router-link to="/administration/arbeitsplaene">
        <button id="btn_close" v-on:click="cancel"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
      </router-link>
      <div class="form-group">
        <label for="arbeitsplanname">Arbeitsplan:</label>
        <input type="text" class="full-width" id="arbeitsplanname" placeholder="Arbeitsplanname" v-model="arbeitsplanname">
        <div id="week">
        <div class="days">
          Montag von
          <input type="time" v-model="mytime" id="mondaystart"> bis
          <input type="time" v-model="mytime" id="mondayend"> Uhr oder Dauer:
          <input type="number" v-model="time" id="monday">
        </div>
        <div class="days">
        Dienstag von
        <input type="time" v-model="mytime" id="tuesdaystart"> bis
        <input type="time" v-model="mytime" id="tuesdayend"> Uhr oder Dauer:
        <input type="number" v-model="time" id="tuesday">
      </div>
      <div class="days">
        Mittwoch von
        <input type="time" v-model="mytime" id="wednesdaystart"> bis
        <input type="time" v-model="mytime" id="wednesdayend"> Uhr oder Dauer:
        <input type="number" v-model="time" id="wednesday">
      </div>
      <div class="days">
      Donnerstag von
      <input type="time" v-model="mytime" id="thursdaystart"> bis
      <input type="time" v-model="mytime" id="thursdayend"> Uhr oder Dauer:
      <input type="number" v-model="time" id="thursday">
    </div>
    <div class="days">
    Freitag von
    <input type="time" v-model="mytime" id="fridaystart"> bis
    <input type="time" v-model="mytime" id="fridayend"> Uhr oder Dauer:
    <input type="number" v-model="time" id="friday">
  </div>
  <div class="days">
    Samstag von
    <input type="time" v-model="mytime" id="saturdaystart"> bis
    <input type="time" v-model="mytime" id="saturdayend"> Uhr oder Dauer:
    <input type="number" v-model="time" id="saturday">
  </div>
  <div class="days">
  Sonntag von
  <input type="time" v-model="mytime" id="sundaystart"> bis
  <input type="time" v-model="mytime" id="sundayend"> Uhr oder Dauer:
  <input type="number" v-model="time" id="sunday">
</div>
</div>
      </div>
      <router-link to="/administration/arbeitsplaene">
        <button class="btn_rechts" v-on:click="create"><i class="fa fa-check" aria-hidden="true" ></i> Arbeitsplan anlegen</button>
        <button class="btn_rechts" v-on:click="cancel"><i class="fa fa-times" aria-hidden="true" ></i> Abbrechen</button>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'neuerArbeitsplan',
  data: function () {
    return {
      arbeitsplanname: "",
      mytime: "",
      time: ""
    };
  },
  methods: {
    create: function(){
      alert("Arbeitsplan wird erstellt! Land:" + this.arbeitsplanname);
    },
    cancel: function(){
      alert("Arbeitsplan wird nicht erstellt!!!");
    }
  }
}
</script>

<style scoped>
  .neuerArbeitsplan {
    height: 700px;
    text-align: center;
  }

  h1 {
    display: block;
    line-height: 700px;
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

  #neuerArbeitsplanDiv {
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

  #week{
    text-align: left;
    padding-left: 50px;
  }

  h3 {
    display: block;
    line-height: 50px;
  }

  .btn_rechts{
  margin-top: 30px;
  margin-bottom: 30px;
  }
</style>
