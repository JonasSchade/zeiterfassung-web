<template>
<div class="login">
  <div class="box center">
    <img src="\src\assets\Chronos_Icon.png" />
    <h3>Welcome to Chronos!</h3>
    <div class="login_wrapper">
        <input type="text" id="user" placeholder="Username">
        <input  type="password" id="password" placeholder="Password">
        <button >Login</button>
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
  min-height: 85vh;
}

.box {
  background-color: white;
  border-radius: 2px;
  box-shadow: 0px 0px 7px #ccc;
  border: 1px solid #ccc;

  padding: 20px;
  min-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login_wrapper{
margin: 0 auto;
}

h3 {
  margin-top: 20px;
  line-height: 40px;
}

img {
  width: 150px;
  max-width: 70%;
}


input {
  width: 95%;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
