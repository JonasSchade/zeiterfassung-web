<template>
  <div class="administration">

  <div class="wrapper">
    <div class="box vertrag">
      <div class="header">
        <i class="fa fa-address-card-o" aria-hidden="true" title="Vertrag"></i>
        <h4>Vertragsdaten verwalten</h4>
      </div>
      <ul>
        <li><router-link to="arbeitsplaene" append>Arbeitspläne</router-link></li>
        <li><router-link to="feiertage" append>Feiertage</router-link></li>
      </ul>
    </div>
    <div class="box organisation">
      <div class="header">
        <i class="fa fa-sitemap " aria-hidden="true" title="Organisation"></i>
        <h4>Organisationsdaten verwalten</h4>
      </div>
      <ul>
        <li><router-link to="laender" append>Länder</router-link></li>
        <li><router-link to="standorte" append>Standorte</router-link></li>
      </ul>
    </div>
    <div class="box personal">
      <div class="header">
        <i class="fa fa-address-book-o" aria-hidden="true" title="Personal"></i>
        <h4>Personaldaten verwalten</h4>
      </div>
      <ul>
        <li><router-link to="abteilungen" append>Abteilungen</router-link></li>
        <li><router-link to="adprojekte" append>Projekte</router-link></li>
        <li><router-link to="benutzer" append>Benutzer</router-link></li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'administration',
}
</script>

<style scoped>
.administration {
  height: 700px;
  text-align: center;
}
.header{
  background-color:  #cdd2d8;
}

.fa {
  padding-top: 10px;
  font-size: 40px;
}

h4 {
  display: block;
  background-color: #cdd2d8;
  padding: 10px;
  margin: 0px;
}

.wrapper {
  display: grid; /* display: inline-grid;*/
  grid-template-columns: 1fr 1fr 1fr; /* 3 x 1 fraction */
}

.vertrag {
  grid-column-start: 1;  /* Spalte*/
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
}
.organisation {
  grid-column-start: 2; /* Spalte*/
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
}
.personal {
  grid-column-start: 3; /* Spalte*/
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
}
.box{
  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
  margin: 20px;
}
ul {
  list-style-type: none;
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 0;
}
ul a{
  color: black;
  text-decoration: none;
}

ul a:hover {
  color: grey;
}
</style>
