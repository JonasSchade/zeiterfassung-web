<template>
<div class="projectcontainer center-block">
  <div class="header">
    <h4 id="p_name">{{projectName}}</h4>
  </div>
  <div class="content">
    <p id="p_inhalt">{{projectDescription}}</p>
    <p id="p_leiter">Projektleiter: {{projectLeiter}}</p>
    <ul>Beteiligte Mitarbeiter:
      <li v-for="mitarbeiter in mitarbeiterArray">
        {{mitarbeiter}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'projectcontainer',
  props: ['projectName', 'projectDescription', 'projectLeiter'],
  data: function() {
    return {
      mitarbeiterArray: ['Hans Wurst', 'Frank Supp'],
      mitarbeiter: ''
    }
  }
}
</script>

<style scoped>
.projectcontainer {
  position: relative;
  max-width: 800px;
  top: 20px;
  bottom: 20px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  margin-bottom: 30px;
  text-align: left;
}

.header {
  background-color: #cdd2d8;
  padding: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
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
