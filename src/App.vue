<template>
  <div id="app">
    <pagenavbar/>
    <router-view/>
    <pagefooter/>
  </div>
</template>

<script>
  import pagenavbar from '@/components/pagenavbar'
  import pagefooter from '@/components/pagefooter'

  export default {
    name: 'app',
    components: { pagenavbar, pagefooter }
  }
</script>

<style>
@import 'globalstyle.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
