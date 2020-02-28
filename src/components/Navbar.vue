<template>
      <nav class="navbar navbar-expand-md navbar-light">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    
                </li>
            </ul>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="mx-auto order-0">
            <a class="navbar-brand mx-auto" href="#/" id="title-navbar">Casa Marcegaglia</a>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ml-auto">
                <template v-if="auth == 'true'">
                    <li class="nav-item">
                        <a class="nav-link pointer" href="#">Area Riservata</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link pointer" v-on:click="logOut">ESCI</a>
                    </li>
                </template>
                <li class="nav-item" v-for="entry in languages" :key="entry.title" v-on:click="changeLocale(entry.language)">
                    <a class="nav-link pointer flag"><country-flag :country="entry.flag" size='medium'/></a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

import { getCookie, setCookie } from './../cookies/cookies.js'
import { i18n } from './../plugins/i18n.js';
import CountryFlag from 'vue-country-flag';

export default {
  methods: {
    logOut() {  
        console.log("IM LOGGING OUT");
        setCookie("authenticated", "false", 7);
        this.$store.commit("authSet", "false");
        window.location.href='/#/login';
    },
    auth() {  
        let auth = getCookie("authenticated");
        return auth;
    },
    changeLocale(locale) {        
        i18n.locale = locale;    
    }
  },
  computed: {
        auth () {
            return this.$store.getters.auth;
        }
    },
    data() {
        return {
        languages: [
            { flag: 'it', language: 'it', title: 'Italiano' }, 
            { flag: 'gbr', language: 'en', title: 'English' }        
        ]
        };
    },
    components: {
        CountryFlag
    }
}
</script>