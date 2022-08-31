<template>
  <div class="contenedor">
    <BuscarSala/>
    <CambioModo/>
    <MapBox/>
  </div>
</template>


<script>

import MapBox from '@/components/MapBox.vue';
import BuscarSala from '@/components/BuscarSala.vue';
import CambioModo from '@/components/CambioModo.vue';

export default{

  components:{
    MapBox,
    BuscarSala,
    CambioModo
}


}
</script>



<style>




</style>
