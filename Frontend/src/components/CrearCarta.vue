<template>
    <div class="caja">
    <div class="titulo">Crear carta</div>
    
    <vs-row justify="space-around">
        <vs-col  w="3">
            <vs-input square label="Titulo" v-model="carta.titulo" placeholder="Ingresar texto" />
        </vs-col>
        <vs-col  w="3">
            <vs-input square label="Descripcion" v-model="carta.descripcion" placeholder="Ingresar texto" />
        </vs-col>
        

    </vs-row> 
    <vs-row justify="space-around">
        <vs-col  w="3">
            <vs-input square label="Url Foto" v-model="carta.urlFoto" placeholder="Ingresar texto" type="url"/>
        </vs-col>
        <vs-col  w="3">
            <vs-button @click="crearCarta" > Añadir </vs-button>
        </vs-col>

    </vs-row>
   
    </div>
</template>

<script>
    export default {
      data(){
        return{
            carta:{
                titulo:"",
                descripcion:"",
                urlFoto:""
            }
            

        }
      },
      methods:{
        crearCarta(){
            if(this.carta.urlFoto==""){
                this.carta.urlFoto = 'https://ejemplocodigo.com/wp-content/themes/qaengine/img/default-thumbnail.jpg'
            }

            this.axios.post('/nueva-carta',this.carta)
            .then(res =>{
                this.carta.titulo =""
                this.carta.descripcion=""
                this.carta.urlFoto=""
                const noti = this.$vs.notification({

                    sticky: true,
                    color:"primary",
                    position:"top-right",
                    title: "Exito!",
                    text: "Se añadio la carta correctamente."
                    
                })


            })
            .catch((e)=>{
                console.log(e.response);
            })

        }
      }
    }
  </script>

<style scoped>

.caja{
    

    margin-top: 10px;
}
.titulo{
    margin-bottom:40px;
    font-size:20px;
    text-align: center;
    color: #DE6283;
    
}
.vs-col{
    margin-bottom: 20px;
}
.vs-input{
    display: inline-block;
    position: relative;
}

</style>