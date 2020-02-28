<template>
  <div class="Home">
      <div class="container">
        <GeneralCommands/>
        <div class="spacer"></div>
        <Aree/>
      </div>
  </div>
</template>
<script>

import GeneralCommands from './GeneralCommands.vue'
import Aree from './Aree.vue'

export default {
    components: { GeneralCommands, Aree },
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
    }
  }
</script>