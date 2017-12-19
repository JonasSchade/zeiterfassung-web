<template>
<div class="login">
  <div class="box center-block">
    <img class="icon" src="\src\assets\Chronos_Icon.png" />
    <h3>Welcome to Chronos!</h3>
    <div class="login_wrapper">
      <div class="input_wrapper">
          <input class="center" type="text" id="user" placeholder="Username">
      </div>
      <div class="input_wrapper">
          <input class="center" type="text" id="password" placeholder="Password">
      </div>
      <div class="button_wrapper">
          <button class="center">Login</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
}
</script>

<style scoped>
.login {
  height: 700px;
  text-align: center;
}

.box {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  padding: 30px;
max-width: 800px;

}

.login_wrapper{
margin: 0 auto;
}

h3 {
  margin-top: 20px;
  line-height: 40px;
}

img.icon {
  width: 150px;
  max-width: 70%;
}

.center{
  display: block;
  margin : 0 auto;
}

.input_wrapper{
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}

.button_wrapper{
    display: flex;
}
</style>
