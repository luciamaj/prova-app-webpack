<template>
  <div id="app">  
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" rel="stylesheet">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import 'css/flaticon.css';
@import 'css/libs/bootstrap.min.css';
@import 'scss/style.scss';

</style>

<script>

import Navbar from './components/Navbar.vue'
import { store } from './store/store.js'
import { getCookie } from './cookies/cookies.js'
import { emitDatiDashboard, recievedDatiDashboard, recievedDatiConfig } from './modules/socket.js'
import JQuery from 'jquery';
let $ = JQuery;

console.log($);

export default {
  name: 'app',
  store,
  components: { Navbar },
  created () {
  },
  methods: {
  }
}
</script>