<template>
  <div class="contenedor">
    
    <!-- <BuscarSala/> -->
    
    <MapBox/>
    <div v-if="$store.state.estadoInfoEdificio">
      <InfoEdificio/>
    </div>
    
  </div>
</template>


<script>

import MapBox from '@/components/MapBox.vue';
import BuscarSala from '@/components/BuscarSala.vue';
import InfoEdificio from '@/components/InfoEdificio.vue';

export default{

  components:{
    MapBox,
    BuscarSala,
    InfoEdificio
}


}
</script>



<style>

.contenedor{

  font-family: 'Roboto', sans-serif;
}


</style>
