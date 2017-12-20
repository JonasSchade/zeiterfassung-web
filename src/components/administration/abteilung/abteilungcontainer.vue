<template>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" href="#collapse1">Abteilung 1</a>
          </h4>
        </div>
        <div id="collapse1" class="panel-collapse collapse">
          <div class="panel-body">
            <div class="left">
              Abteilungsleiter:
            </div>
            <div class="right">
              Hubert Müller
            </div>
          </div>
          <div>
            <div class="left">
              Abteilungsmitarbeiter:
            </div>
            <div class="right">
              Max Mustermann<br>
              Peter Schmid<br>
              Franz Mayer
            </div>
          </div>
        </div>
      </div>
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
.panel-heading{
  background-color: #cdd2d8
}

.panel-collapse{
  margin: 0 auto;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  padding-left: 0px;
  padding-right: 0px;
  padding: 20px;
}

.left{
  text-align:right;
  display: inline-block;
}

.right{
  width: 500px;
  text-align: left;
  display: inline-block;
}
</style>
