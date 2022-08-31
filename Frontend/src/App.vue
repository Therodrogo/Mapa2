<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
import BarraMenu2 from './components/BarraMenu2.vue'

export default {
  name: 'HomeView',
  components: {
    BarraMenu2
}
}
</script>

<style>
body{
  margin: 0;
}

</style>
