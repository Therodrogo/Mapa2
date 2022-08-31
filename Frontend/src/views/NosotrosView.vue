<template>
  <div class="contenedor">
    <p  v-for="item in misdatos" :key="item.id">
      {{ item.coordenadas }} 
      {{item.icono}}
    </p>
  </div>
</template>

<script>
import datos from "@/datos"

export default {

  data(){
    return{
      misdatos:datos
    }
  }

}

</script>

<style>

</style>