<template>
  <div class="mitarbeiter">
    <p v-for="role in roles">ID: {{role.ID}} || Name: {{role.Name}}</p>
  </div>
</template>

<script>
export default {
  name: 'mitarbeiter',
  data() {
    return {
      roles: [],
    }
  },
  created() {
    var vueinst = this;

    this.$http.get('http://localhost:3000/api/roles').then(response => {
        console.log(response);
        vueinst.roles = response.body;
    });
  }
}
</script>

<style scoped>
  .mitarbeiter {
    text-align: center;
  }

  p {
    padding-bottom: 50px;
    display: block;
  }
</style>
