<template>
  <div id="app">
    <navbar/>
    <router-view/>
    <pagefooter/>
  </div>
</template>

<script>
  import navbar from '@/components/navbar'
  import pagefooter from '@/components/pagefooter'

  export default {
    name: 'app',
    components: { navbar, pagefooter }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
