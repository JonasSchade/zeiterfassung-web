<template>
  <nav class="pagenavbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
        <span class="navbar-brand">
          <img class="icon" src="/static/assets/Chronos_Icon.png" alt="chronos-icon"/>
        </span>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-if="loggedin">
        <ul class="nav navbar-nav navbar-right">
          <li v-bind:class="{active: activePage == 'dashboard'}">
            <router-link to="/dashboard">
              <i class="fa fa-calendar" aria-hidden="true" title="Dashboard"></i>Dashboard
            </router-link>
          </li>
          <li v-bind:class="{active: activePage == 'mitarbeiter'}" v-if="departmentmanager">
            <router-link to="/mitarbeiter">
              <i class="fa fa-users" aria-hidden="true" title="Mitarbeiter"></i>Mitarbeiter
            </router-link>
          </li>
          <li v-bind:class="{active: activePage == 'projekte'}" v-if="projectmanager">
            <router-link to="/projekte">
              <i class="fa fa-list-ul" aria-hidden="true" title="Projekte"></i>Projekte
            </router-link>
          </li>
          <li v-bind:class="{active: activePage == 'administration'}" v-if="admin">
            <router-link to="/administration">
              <i class="fa fa-server" aria-hidden="true" title="Administration"></i>Administration
            </router-link>
          </li>
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-user" aria-hidden="true"></i>{{userdisplayname}} <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/settings">
                  <i class="fa fa-gear" aria-hidden="true"></i>Einstellungen
                </router-link>
                <a v-on:click="logout()">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'pagenavbar',
  data() {
    return {
      activePage: 'dashboard',
      userdisplayname: 'Dominik',
      loggedin: false,
      admin: false,
      projectmanager: false,
      departmentmanager: false,
    };
  },
  created() {
    this.activePage= this.$route.fullPath.split("/")[1];
    this.updateRestrictions();
  },
  watch: {
    '$route' (to, from) {
      this.activePage= to.fullPath.split("/")[1];
      this.updateRestrictions();
    }
  },
  methods: {
    updateRestrictions() {
      this.userdisplayname = 'Dominik';
      this.loggedin = false;
      this.admin = false;
      this.projectmanager = false;
      this.departmentmanager = false;

      if (window.sessionStorage.chronosAuthToken == null) {
        return;
      }

      this.$http.get("http://localhost:3000/api/authenticate", {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
        //api says no
        if (!response.body.loggedin) {
          return;
        }

        this.userdisplayname = response.body.userdisplayname;
        this.loggedin = response.body.loggedin;
        this.admin = response.body.admin;
        this.projectmanager = response.body.projectmanager;
        this.departmentmanager = response.body.departmentmanager;

      });
    },
    logout() {
      window.sessionStorage.chronosAuthToken = null;
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
  .pagenavbar {
    margin-bottom: 10px;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    border: 0px;
  }

  i {
    padding-right: 7px;
  }

  .navbar-brand {
    color: white !important;
  }

  .navbar-header .navbar-toggle {
    color:white;
    text-align: center;
  }

  .navbar-header .navbar-toggle i {
    padding-left: 7px;
  }

  .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {
    color: white;  /*Sets the text hover color on navbar*/
  }

  .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active >
  a:hover, .navbar-default .navbar-nav > .active > a:focus {
    color: white; /*BACKGROUND color for active*/
    background-color:  #ba2720;
  }

  .navbar-default {
    background-color: #003452;
    border-color: #003452;
  }

  .navbar-default .navbar-nav>.open>a {
    background-color: #003452;
  }

  .dropdown-menu > li , .dropdown-menu {
    color: white ;
    border-color: #003452;
    background-color: #003452;  /*change color of links in drop down here*/
    padding-top: 0px;
  }

  .dropdown-menu a {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .dropdown-menu a i {
    background-color: hsla(350,50%,50%,0);
  }

  .dropdown-menu > li > a:hover,
  .dropdown-menu > li > a:focus {
    color: white;
    text-decoration: none;
    background-color: #0062a7;  /*change color of links in drop down here*/
  }

  .nav > li > a:hover,
  .nav > li > a:focus {
    text-decoration: none;
    background-color: #0062a7; /*Change rollover cell color here*/
  }

  .navbar-default .navbar-nav > li > a {
    color: white; /*Change active text color here*/
  }

  img.icon {
  position: absolute;
  top: 1px;
  left: 3%;
  width: 100px;
  max-width:70%;
}
</style>
