<template>
    <div class="cajaGrande" >

        <div class="caja1">
            <router-link to="/" >
                <img src="https://i.ibb.co/4MsS8Dq/logo-kyastore-tranparent2.png" alt="aglo">
            </router-link>
            
            <div class="buscar">
            <!-- <vs-input type="search" placeholder="Buscar"/>    -->
            <input type="search" placeholder="Buscar">
            <vs-button color="#C68DF0">
                <span class="material-icons-outlined">
                    search
                </span>

            </vs-button>
            </div>
            <vs-button @mouseenter="prueba" to="/admin">
                <div  >
                        Iniciar Sesion
                </div>
                
                <vs-button color="warning"> 
                    <span class="material-icons-outlined">
                        expand_more
                    </span>

                </vs-button>
                
            </vs-button>
             
        </div>
    
        <div class="caja">
            
            <vs-button to="/" flat square :active="active == 0 " @click="active = 0">
                Inicio
            </vs-button>
            <vs-button to="/about" flat square :active="active == 1 " @click="active = 1">
                About
            </vs-button >
            <vs-button to="/nosotros" flat square :active="active == 2 " @click="active = 2">
                Nosotros
            </vs-button>
        </div>

        <div class="borde">

        </div>
    </div>
</template>

<script>
export default {
    data:() => ({
    active: 0
    }),
    methods:{
        prueba(){
            console.log("hsdjhsa")
        }
    }
}
</script>

<style scoped>

.cajaGrande{
    background: #ab4b6524;
    
    
    
}
.otroBoton{
    z-index: 10;
}
.borde{
    background: #DE6283;
    height: 5px; 
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    /* box-shadow: rgba(222, 98, 131,0.4) 0px 5px, rgba(222, 98, 131,0.3) 0px 10px, rgba(222, 98, 131,0.2) 0px 15px, rgba(222, 98, 131,0.1) 0px 20px, rgba(222, 98, 131,0.05) 0px 25px;
 */
   }
.caja1{
    display: flex;
    justify-content: space-around;
    width: auto;
    height: 50px;
}


.caja{
    display: flex;
    justify-content: center;
    
}
.buscar{
    display: flex;
    justify-content: center;

}

.caja .vs-button{
    font-size: 15px;
    margin: 0;
}

span{
    position: relative;
    bottom: 4px;
    right: 4px;
    height: 15px;
    width: 15px;
}
img{
    position: relative;
    bottom: 7px;
    margin: 7px;
    width: 80px;
    height: 80px;
    cursor: pointer;
}

input{
    /* border-top-left-radius: 5%;
    border-bottom-left-radius: 5%;
    border-top-right-radius: 5%;
    border-bottom-right-radius: 5%; */
    position: relative;
    top: 7px;
    height: 35px;
    width: 40vw;
    border: transparent;
}

</style>