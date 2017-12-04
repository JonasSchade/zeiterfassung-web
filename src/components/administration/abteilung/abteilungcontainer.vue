<template>
  <div class="abteilungcontainer center-block">
    <div class="header">
      <div class="left">
        <h4 id="abt_name">{{abtname}}</h4>
        Abteilung
      </div>
      <div class="right">
          <i class="fa fa-pencil" aria-hidden="true"></i>
          <i class="fa fa-trash-o" aria-hidden="true"></i>
      </div>
    </div>
    <div class="content">
      <p id="a_leiter">Abteilungsleiter: {{abtleiter}}</p>
      <ul>Mitarbeiter dieser Abteilung:
        <li v-for="mitarbeiter in mitarbeiterArray">
          {{mitarbeiter}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'abteilungcontainer',
  props: ['abtname', 'abtleiter'],
  data: function() {
    return {
      mitarbeiterArray: ['Max Mustermann', 'Hans Mayer'],
      mitarbeiter: ''
    }
  }
}
</script>

<style scoped>
.abteilungcontainer {
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  margin-bottom: 30px;
}

.header {
  background-color: #cdd2d8;
  padding: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: inline-flex;
  width: 100%;
}

.right{
  position:absolute;
  right: 0px;
  padding-right: 15px;
  padding-top: 5px;
}

.left{
  float: left;
}

.content{
  padding: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.pagefooter {
  padding-top: 10px;
  height: 70px;
  background-color: #003452;
}

a {
  float: right;
  text-decoration: none;
  color: white;
  position: relative;
  top: 20px;
  padding-right: 30px;
}

ul{
  border: 1px solid grey;
  border-radius: 5px;
  padding: 15px;
  list-style-type: none;
}
</style>
