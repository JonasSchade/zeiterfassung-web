<template>
  <div class="pagefooter">
    <a  target="_blank" href="http://www.github.com/JonasSchade/zeiterfassung-web"><i class="fa fa-github"></i> GitHub</a>
  </div>
</template>

<script>
export default {
  name: 'pagefooter',
}
</script>

<style scoped>
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
