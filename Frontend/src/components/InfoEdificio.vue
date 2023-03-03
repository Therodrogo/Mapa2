<template>
    <div class="caja">
        <div class="salir">
            <vs-button @click="cerrarVentana">X</vs-button>
        </div>
        
        <div class="caja2">
            <p class="text2">{{this.$store.state.edificioSelecionado.nombre }}</p>
            <div class="foto">
                <div v-if='this.$store.state.edificioSelecionado.foto!=""'>
                    <img :src="this.$store.state.edificioSelecionado.foto" alt="">
                </div>
                <img v-else src="https://images.ecestaticos.com/tUsQqBMzVgb6yd63QjsoObsXmd0=/0x0:0x0/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd53%2F5d5%2Fdb0%2Fd535d5db070fa6ecf441b32de847e756.jpg" alt="">
            </div>

            <div>
                <div class="salas"  >
                    <div class="text" v-for="item in infoOne">
                        {{ item.nombre }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Mapa2InfoEdificio',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        cerrarVentana(){
            this.$store.state.estadoInfoEdificio=false
          this.$router.push({ path: '/' })
        }
    },
    computed: {
        infoOne: function () {
            return this.$store.state.Salas.filter(i => i.nombreEdificio === this.$store.state.edificioSelecionado.nombre)
        },

    }
};
</script>

<style scoped>

.caja{
    color: white;
    display: flex;
    justify-content: space-around;
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(108, 108, 108, 0.675);
    z-index: 2;
}
.caja2{
    
    display: flex;
    
    flex-direction: column;
    width:75%;
}
.foto{
    display: flex;
    width: 100%;
    background: white;
    border-top-right-radius: 5%;
    border-top-left-radius: 5%;
    border-bottom-right-radius: 5%;
    border-bottom-left-radius: 5%;

}
.foto img{
    object-fit: cover;
    width: 75vw;
    height: 30vh;
    border-top-right-radius: 5%;
    border-top-left-radius: 5%;
    border-bottom-right-radius: 5%;
    border-bottom-left-radius: 5%;
}
.text2{
    text-align: center;
    font-size: 7vw;
}
.salas{
    display: flex;
    flex-direction: column;
    height: 40vh;
    overflow-y: scroll;
    margin-top: 5%;
}
.text{
    text-align: center;
    font-size: 5vw;
    margin: 5px;

} 

.salir{
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    position: absolute;
    right: 2%;
    top: 1%;
}
</style>