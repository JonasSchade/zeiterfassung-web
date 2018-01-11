<template>
  <b-card class="tablistitem">
    <b-card-header header-tag="header" class="row" role="tab">
      <div class="col-sm-12">
        <div class="expandbutton" block v-b-toggle="'conatiner-'+contentid">{{contentname}}
          <i class="fa fa-pencil-square-o " v-on:click="$router.push({path:($router.history.current.fullPath+'/edit/'+contentid) })" aria-hidden="true"></i>
        </div>
      </div>
    </b-card-header>
    <b-card-body class="row">
      <b-collapse class="col-sm-12" v-bind:id="'conatiner-'+contentid" role="tabpanel" accordion="tablist">
        <div>
          <slot></slot>
        </div>
      </b-collapse>
    </b-card-body>
  </b-card>
</template>


<script>
export default {
  name: 'tablistitem',
  props: {
    contentid: Number,
    contentname: String,
  },
}
</script>

<style scoped>
.tablistitem {
}


.card {
  margin-bottom: 30px;
}

.card-header {
  box-shadow: 0px 0px 7px #ccc;
}

.card-body, .card-header {
  margin-left: 0px;
  margin-right: 0px;
}

.col-sm-12 {
  padding: 0px;
}

.expandbutton {
  text-align: left;
  background-color: #003452;
  padding: 20px;
  border: none;
  font-size: 18px;
  color: white;
  box-shadow: 0px 0px 7px #ccc;
}

.expandbutton i {
  color: white;
  background-color: none;
  float: right;
  line-height: 26px;
  margin-left: 15px;
}

.collapse div {
  border-radius: 0px 0px 3px 3px;
  box-shadow: 0px 0px 7px #ccc;
  padding: 20px;
}

</style>
