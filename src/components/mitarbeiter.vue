<template>
  <div class="mitarbeiter">
    <p v-for="post in posts">{{post.title}}</p>
  </div>
</template>

<script>
export default {
  name: 'mitarbeiter',
  data() {
    return {
      posts: [],
    }
  },
  created() {
    var vueinst = this;

    Vue.http.get('http://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response);
        vueinst.posts = response.body;
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
