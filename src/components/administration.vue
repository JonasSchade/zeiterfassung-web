
<template>
<div class="administration">
  <div class="container">

    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="header">
          <i class="fa fa-address-book-o" aria-hidden="true" title="Personal"></i>Personaldaten verwalten
        </div>
      </div>
    </div>
    <div class="row contentRow">
      <div class="col-sm-12 text-center content">
        <div class="col-sm-4 text-center">
          <router-link to="/administration/projekte">
            <button class="full-width"><i class="fa fa-list-ul" aria-hidden="true"></i>Projekte</button>
          </router-link>
        </div>
        <div class="col-sm-4 text-center">
          <router-link to="/administration/abteilungen">
          <button class="full-width"><i class="fa fa-users" aria-hidden="true"></i>Abteilungen</button>
        </router-link>
        </div>
        <div class="col-sm-4 text-center">
          <router-link to="/administration/mitarbeiter">
            <button class="full-width"><i class="fa fa-user" aria-hidden="true"></i>Mitarbeiter</button>
          </router-link>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="header">
          <i class="fa fa-sitemap " aria-hidden="true" title="Organisation"></i>Organisationsdaten verwalten
        </div>
      </div>
    </div>
    <div class="row contentRow">
      <div class="col-sm-12 text-center content">
        <div class="col-sm-offset-1 col-sm-4 text-center">
          <router-link to="/administration/laender">
            <button class="full-width"><i class="fa fa-globe" aria-hidden="true"></i>Länder</button>
          </router-link>
        </div>
        <div class="col-sm-offset-2 col-sm-4 text-center">
          <router-link to="/administration/standorte">
            <button class="full-width"><i class="fa fa-map-marker" aria-hidden="true"></i>Standorte</button>
          </router-link>
        </div>
        <span class="comingSoon">COMING SOON</span>
      </div>
    </div>


    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="header">
          <i class="fa fa-address-card-o" aria-hidden="true" title="Vertrag"></i>Vertragsdaten verwalten
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 text-center content">
        <div class="col-sm-offset-1 col-sm-4 text-center">
          <router-link to="/administration/arbeitsplaene">
            <button class="full-width"><i class="fa fa-list-alt" aria-hidden="true"></i>Arbeitspläne</button>
          </router-link>
        </div>
        <div class="col-sm-offset-2 col-sm-4 text-center">
          <router-link to="/administration/feiertage">
            <button class="full-width"><i class="fa fa-calendar-o" aria-hidden="true"></i>Feiertage</button>
          </router-link>
        </div>
        <span class="comingSoon">COMING SOON</span>
      </div>
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
  min-height: 100vh;
  text-align: center;
  width: 100%;
}
.container {
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  margin-bottom: 30px;
  padding-left: 5px;
  padding-right: 5px;
}
.col-sm-12 {
  padding: 0px;
}
.header {
  text-align: left;
  background-color: #003452;
  padding: 20px;
  border: none;
  font-size: 18px;
  color: white;
  -webkit-box-shadow: 0px 0px 7px #ccc;
  box-shadow: 0px 0px 7px #ccc;
}

.content {
  border-radius: 0px 0px 3px 3px;
  box-shadow: 0px 5px 7px #ccc;
  padding: 20px;
}

.col-sm-4 button {
  padding-top: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-bottom: 20px;
  font-size: 17px;
}

.contentRow {
  margin-bottom: 20px;
}

i {
  margin-right: 10px;
}

.comingSoon {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  font-size: 50px;
  background-color: rgba(255,255,255,0.7);
  line-height: 112px;
  vertical-align: middle;
}
</style>
