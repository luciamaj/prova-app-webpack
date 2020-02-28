<template>
<div class="row generalControl centered">
    <div v-bind:key="command" class="col" v-for="command in $store.getters.generalCommands">
        <button v-if="command.command ==  'accendi-all'" class="btn-lg btn-success btn">{{ command.name | uppercase }}</button>
        <button v-else class="btn-lg btn-danger btn">{{ command.name | uppercase }}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Commands',
    filters: {
        uppercase: function(v) {
        return v.toUpperCase();
        }
    }
  }
</script>