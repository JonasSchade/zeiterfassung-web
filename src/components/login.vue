<template>
<div class="login">
  <div class="box center">
    <img src="\src\assets\Chronos_Icon_dark.png" />
    <form class="login_wrapper">
        <p>{{error}}</p>
        <input type="text" v-model="username" placeholder="Username">
        <input type="password"  v-model="pw_plaintext" placeholder="Password">
        <button v-on:click="submit(pw_plaintext, username)">Login</button>
    </form>
  </div>
</div>
</template>

<script>
import unorm from 'unorm'
import sjcl from 'sjcl'

export default {
  name: 'login',
  data() {
    return {
      pw_plaintext: '',
      username: '',
      rounds: 1000,
      error: ""
    }
  },
  methods:{
    encrypt: function(pw_plaintext, username) {
      pw_plaintext = unorm.nfc(pw_plaintext)
      username = unorm.nfc(username.trim()).toLowerCase()
      // Deterministic unique salt: e.g. service name plus username
      var salt = sjcl.codec.utf8String.toBits("myservice" + username);
      // Run PBKDF2 computation, return result as hexadecimal encoding
      var key = sjcl.misc.pbkdf2(pw_plaintext, salt, this.rounds, 32 * 8, function(key) {
          var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha256);
          this.encrypt = function () {
              return hasher.encrypt.apply(hasher, arguments);
          };
      });
      return sjcl.codec.hex.fromBits(key);
    },
    submit: function(){
      this.error = "";

      var pw = this.encrypt(this.pw_plaintext, this.username);

      this.$http.post("http://localhost:3000/api/token",{"username":this.username,"pw":pw}).then((response) => {
        if (! response.body.success) {
          this.error = "Credentials invalid"
          return;
        }

        window.sessionStorage.chronosAuthToken = response.body.token;
        this.$router.push("/dashboard");

      }).catch((error) => {console.log(error)});
    }
  }
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
  width: 200px;
  max-width: 70%;
  margin: 25px;
}

button {
margin: 20px 20px 0px 20px;

}

input {
  width: 95%;
  margin-top: 10px;
  margin-bottom: 10px;
}
p {
  color: red;
  font-weight: bold;
}

</style>
