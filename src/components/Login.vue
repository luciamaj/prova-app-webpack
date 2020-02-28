<template>
   <div class='container'>
        <div class='row'>
            <div class="wrapper">
                <div class="formContent">
                    <form name="Form" onsubmit="" >
                        <input v-model="username" type="text" id="fuser" class="logtxt" name="usr" placeholder="User Name">
                        <input  v-model="password" type="password" id="fpassword" class="logtxt" name="pswd" placeholder="Password">
                        <input id="submit-form" v-on:click="auth" class="logsub pointer" value="ACCEDI">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let username = "";
let password = "";

import { setCookie, getCookie } from './../cookies/cookies.js'

export default {
  data: function () {
    return {
      username: username,
      password: password,
    }
  },
  methods: {
    auth() {
      console.log(this.$store.getters.credentials.username + " e " + this.$store.getters.credentials.password)
      if(this.username != this.$store.getters.credentials.username){
        alert("Username not valid");
        return;
      }
      if(this.password!= this.$store.getters.credentials.password){
        alert("Password not valid");
        return;
      }
      
      setCookie("authenticated", "true", 7);
      this.$store.commit("authSet", "true");
      console.log("AUTH", getCookie("authenticated"));

      window.location.href = '/#/'
    }
  }
}
</script>