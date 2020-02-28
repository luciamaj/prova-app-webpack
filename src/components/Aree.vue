<template>
    <div class="jumbotron">
      <div class="row">
        <div class="col-12">
          <h3>{{ $t('title') }}</h3>
          <div class="spacer"></div>
          <div>
            <div class="row aree">
              <div v-for="sala in $store.getters.sale" v-bind:key="sala" class="col-md-4 col-lg-3 col-sm-12">
                <!--template  v-if="sala.configures.id == '1'"-->
                  <template  v-if="sala.stats == 'success'">
                    <a class="sale-name" :href="'#/area/' + sala.id"><i class="fas fa-circle state success-text"></i>{{ sala.name }}</a>
                    <p>state: on</p>
                  </template>
                  <template  v-else>
                    <a class="sale-name" :href="'#/area/' + sala.id"><i class="fas fa-circle state warning-text"></i>{{ sala.name }}</a>
                    <p>state: warning</p>
                  </template>
                <!--/template-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Aree',
  filters: {
      uppercase: function(v) {
      return v.toUpperCase();
    }
  }
}
</script>