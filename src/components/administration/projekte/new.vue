<template>
<div class="newproject">
  <div class="container">
    <div class="topper">
      <div class="row">
        <div class="col-sm-4 text-left">
          <button v-on:click="$router.push('/administration/projekte')">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            Projekte
          </button>
        </div>
        <div class="col-sm-4">
          <h3>Neues Projekt</h3>
        </div>
      </div>
    </div>

    <form class="container-flex">
      <div class="row align-middle">
        <label class="col-sm-offset-1 col-sm-3 text-right">Name:</label>
        <div class="col-sm-9">
          <input type="text" class="full-width" />
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Beschreibung:</label>
        <div class="col-sm-9">
          <textarea class="full-width" rows="5"></textarea>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Manager:</label>
        <div class="col-sm-9">
          <select class="full-width">
            <option v-for="user in users" :value="user.id">{{user.firstname}} {{user.lastname}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <label class="col-sm-offset-1 col-sm-3 text-right">Zugewiesene Mitarbeiter:</label>
        <select class="col-sm-6" id="adduser">
          <option v-for="user in users.filter(user => ! linkedusers.includes(user))" :value="user.id">{{user.firstname}} {{user.lastname}}</option>
        </select>
        <div class="col-sm-3">
          <button class="full-width" v-on:click="addUser()">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Hinzufügen
          </button>
        </div>
      </div>
      <div class="row">
        <div  id="linkedusers" class="col-sm-6 col-sm-offset-3">
          <ul class="container-flex">
            <li class="row" v-for="user in linkedusers">
              <div class="col-xs-10">{{user.firstname}} {{user.lastname}}</div>
              <div class="col-xs-2">
                <i class="fa fa-minus" aria-hidden="true" :value="user.id" v-on:click="removeUser($event)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <button>
          <i class="fa fa-plus" aria-hidden="true"></i>
          Projekt hinzufügen</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'newproject',
  data() {
    return {
      users: [],
      linkedusers: []
    }
  },
  created() {

    this.$http.get('http://localhost:3000/api/user', {headers: {Authorization: ('bearer '+ window.sessionStorage.chronosAuthToken)}}).then(response => {
      console.log(response.body)
      this.users = response.body;
    }, (err) => {
      if (err.status == 401) {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    findById: function(arr, id) {
      for(var i = 0; i < arr.length; i++)
      {
        if(arr[i].id == id)
        {
          return i;
        };
      };
    },
    addUser: function() {

      var userSelect = $("#adduser")[0];

      if (userSelect.selectedIndex == -1) {
        return;
      }

      //find user with selected id in users
      var index = this.findById(this.users, userSelect.options[userSelect.selectedIndex].value);

      this.linkedusers.push(this.users[index]);

    },
    removeUser: function(el) {
      var index = this.findById(this.linkedusers, el.srcElement.getAttribute("value"));

      this.linkedusers.splice(index,1)
    }
  }
}
</script>

<style scoped>
  .newproject {
    text-align: center;
  }


  .topper {
    margin-bottom: 20px;
  }

  .topper h3 {
    margin-bottom: 5px;
    margin-top: 5px;
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

  p {
    padding-bottom: 50px;
    display: block;
  }

  .container-flex .row {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .container-flex label {
    margin: 0px;
  }

  *[class^="col-sm-"] {
    padding-left: 10px;
    padding-right: 10px;
  }

  #linkedusers {
    padding: 0px;
  }
  #linkedusers ul {
    list-style-type: none;
    padding: 0px;
    max-height: 200px;
    overflow-y: scroll;
  }

  li {
    width: 100%;
  }

  #linkedusers ul .row {
    padding: 0px;
    margin: 0px;
    margin-bottom: 10px;
  }
/*
  .container-flex input, .container-flex button, .container-flex select {
    margin: 10px;
  }
  */
</style>
