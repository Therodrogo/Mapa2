<template>
    <div class="carta">
        <vs-card >
        <template #title>
            <h3 @click="openNotification('top-right','#E36FBC')">{{carta.titulo}}</h3>
        </template>
        <template #img>
            <img @click="openNotification('top-right','#E36FBC')" :src=carta.urlFoto alt="aqui va foto">
        </template>
        <template #text>
        <p @click="openNotification('top-right','#E36FBC')">
            {{carta.descripcion}}
        </p>
        </template>
        <template #interactions>
        <!-- INTERACIONRESCIAONSEW -->
            <vs-button @click="borrarCarta(carta._id)">
                <span class="material-icons">
                    delete
                </span>
            </vs-button>
        </template>
        </vs-card>
    </div>
</template>

<script>
export default {

    props:{
        carta:{}
        
    },
    methods:{
        openNotification(position = null, color) {
          

          const noti = this.$vs.notification({
            sticky: true,
            color,
            position,
            title: this.carta.titulo,
            text: this.carta.descripcion
            
          })
        },
        borrarCarta(id){

            this.axios.delete("/carta/"+id)

            .then(res =>{
                const index = this.$store.state.cartas.findIndex(item => item._id == res.data._id)
                this.$store.state.cartas.splice(index,1)

                const noti = this.$vs.notification({
                    sticky: true,
                    color: "primary",
                    position: "top-right",
                    title: "Eliminar",
                    text: "Se elimino correctamente."
                    
                })

                
            })
            .catch(e =>{
                console.log(e.response);
            })
        }
    }

}
</script>

<style scoped>
.carta{
    margin-left: 3%;
    margin-right: 3%;
}

</style>