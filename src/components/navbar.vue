<template>
<nav class="navbar">

  <span class="user">
    <router-link to="dashboard">
      <i class="fa fa-user" aria-hidden="true"></i>{{user}}
    </router-link>
  </span>

  <ul>
    <li v-bind:class="{active: activePage == 'dashboard'}">
      <router-link to="dashboard">
        <i class="fa fa-calendar" aria-hidden="true" title="Dashboard"></i>Dashboard
      </router-link>
    </li>
    <li v-bind:class="{active: activePage == 'mitarbeiter'}">
      <router-link to="mitarbeiter">
        <i class="fa fa-users" aria-hidden="true" title="Mitarbeiter"></i>Mitarbeiter
      </router-link>
    </li>
    <li v-bind:class="{active: activePage == 'projekte'}">
      <router-link to="projekte">
        <i class="fa fa-list-ul" aria-hidden="true" title="Projekte"></i>Projekte
      </router-link>
    </li>
    <li v-bind:class="{active: activePage == 'administration'}">
      <router-link to="administration">
        <i class="fa fa-server" aria-hidden="true" title="Administration"></i>Administration
      </router-link>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  name: 'navbar',
  data: function () {
    return {
      activePage: 'dashboard',
      user: 'Dominik',
    };
  },
  watch: {
    '$route' (to, from) {
      this.activePage= to.name;
    }
  }
}
</script>

<style scoped>

  .navbar {
    width: 100%;
    position: fixed;
    top: 0px;
    margin-bottom: 10px;
    background-color: #003452;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
  }

  ul {
    float: right;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  li a, span a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover, span a:hover {
    background-color: #0062a7;
  }

  .active {
    background-color: #ba2720;
  }

  .user {
    float: right;
    padding-left: 20px;
  }

  i {
    padding-right: 7px;
  }
</style>
