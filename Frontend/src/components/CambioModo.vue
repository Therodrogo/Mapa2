<template>
    <div class="cambioModo">
        <vs-button @click="cambiarModo"  :color="this.$store.state.colorPrincipal">
            <div v-if="this.$store.state.style != this.$store.state.styleDark">
                <span class="material-icons-outlined">
                    dark_mode
                </span>
            </div>
            <div v-else>
                <span class="material-icons-outlined">
                    wb_sunny
                </span>
            </div>
            
        </vs-button>
    </div>
  </template>
  <script>
    export default {
      data:() => ({
        estado:false
      }),
      methods:{
        cambiarModo(){

            if(this.$store.state.style == this.$store.state.styleDay){
                console.log("dark")
                this.$store.state.style = this.$store.state.styleDark;
                this.estado= true
                this.$store.state.colorPrincipal = '#52525C'

                this.$store.state.map.setStyle(this.$store.state.styleDark)
                
                
            }
            else{
                console.log("light")
                this.$store.state.style = this.$store.state.styleDay;
                this.estado= false
                this.$store.state.colorPrincipal = '#313C75'
                this.$store.state.map.setStyle(this.$store.state.styleDay)
                
            }

        }

      }
    }
  </script>

<style scoped>
.cambioModo{
    position: relative;
    float: right;
}

</style>