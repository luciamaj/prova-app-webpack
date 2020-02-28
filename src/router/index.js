import Vue from 'vue'
import Router from 'vue-router'
import Area from './../components/Area.vue'
import Home from './../components/Home.vue'
import Login from './../components/Login.vue'
import SetsOverview from './../components/SetsOverview.vue'
import SetCreation from './../components/SetCreation.vue'
import { getCookie } from './../cookies/cookies.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { 
      path: '/area/:id', 
      component: Area,
      beforeEnter: (to, from, next) => {
        var cookie = getCookie("authenticated");
        if(cookie == "true") {
          next();
          return;
        } else {
          next('/login');
          return;
        }
      }  
    },
    { 
      name: "login",
      path: '/login', 
      component: Login,   
      beforeEnter: (to, from, next) => {
        if(getCookie("authenticated") == true) {
          next('/');
          return;
        } else {
          next();
          return;
        }
      }          
    },

    { 
      path: '/sets', 
      component: SetsOverview,
      beforeEnter: (to, from, next) => {
        var cookie = getCookie("authenticated");
        if(cookie == "true") {
          next();
          return;
        } else {
          next('/login');
          return;
        }
      }  
    },

    { 
      path: '/setMod/:id', 
      component: SetCreation,
      beforeEnter: (to, from, next) => {
        var cookie = getCookie("authenticated");
        if(cookie == "true") {
          next();
          return;
        } else {
          next('/login');
          return;
        }
      }  
    }
  ]
})

export default router;