<template>
<div class="projectcontainer center-block">
  <div class="header">
    <p id="p_name">{{projectName}}</p>
  </div>
  <div class="content">
    <p id="p_inhalt">{{projectDescription}}</p>
    <p id="p_leiter">Projektleiter: {{projectLeiter}}</p>
    <ul>Mitarbeiter

    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'projectcontainer',
  props: ['projectName', 'projectDescription', 'projectLeiter'],
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
}

.header {
  background-color: #cdd2d8;
  padding: 20px;
}

.content{
  padding-left: 0px;
  padding-right: 0px;
  padding: 30px;
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
</style>
