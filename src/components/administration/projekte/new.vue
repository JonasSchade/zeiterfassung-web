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
      <div class="row">
        <label class="text-right">Name:</label>
        <input  type="text" />
      </div>
      <div class="row">
        <label class="text-right">Beschreibung:</label>
        <textarea ></textarea>
      </div>
      <div class="row">
        <label class="text-right">Manager:</label>
        <select >
          <option v-for="user in users" :value="user.id">{{user.firstname}} {{user.lastname}}</option>
        </select>
      </div>
      <div class="row">
        <label class="text-right">Zugewiesene Mitarbeiter:</label>
        <select id="adduser">
          <option v-for="user in users.filter(user => ! linkedusers.includes(user))" :value="user.id">{{user.firstname}} {{user.lastname}}</option>
        </select>
        <button v-on:click="addUser()">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Hinzufügen
        </button>
        <ul>
          <li v-for="user in linkedusers">
            {{user.firstname}} {{user.lastname}}
            <i class="fa fa-minus" aria-hidden="true" :value="user.id" v-on:click="removeUser($event)"></i>
          </li>
        </ul>
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

    this.$http.get('http://localhost:3000/api/user').then(response => {
      console.log(response.body)
      this.users = response.body;
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


  .container-flex input, .container-flex button, .container-flex select {
    margin: 10px;
  }
</style>
