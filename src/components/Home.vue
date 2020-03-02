<template>
  <div class="Home">
      <div class="container">
        <div class="spacer">
          CANE Carlone one oneocnd
        </div>
      </div>
  </div>
</template>
<script>

import { recievedDatiConfig } from './../plugins/socket.js'

export default {
    components: { },
    data () {
        return {
            name: 'Home',
            description: 'Questa è la home'
        }
    },
    computed: {
      //
    },
    mounted() {
    },
    created() {
      this.datiConfig();
    },
    methods: {
      datiConfig() {
        recievedDatiConfig();
      }
    }
  }
</script>