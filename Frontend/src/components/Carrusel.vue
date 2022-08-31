<template>
  <div>
    <div class="caja">
        <div class="imagen" >
            <img :src="elementos[index]"/>
        </div>
        
        <div class="navegacion">
            <div @click="anterior"  class="nav-izquierda"> 
                <span class="material-icons-round">
                    arrow_back_ios
                </span>
            </div>
            
            <div @click="siguiente" class="nav-derecha"> 
                <span class="material-icons-round">
                    arrow_forward_ios
                </span>
            </div>

        </div>
     
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            elementos:["https://estaticos.muyinteresante.es/media/cache/1000x_thumb/uploads/images/gallery/59c4f5655bafe82c692a7052/gato-caja_0.jpg",
            "https://estaticos.muyinteresante.es/media/cache/1000x_thumb/uploads/images/gallery/59c4f5655bafe82c692a7052/gato-amasando.jpg",
            "https://www.caracteristicas.co/wp-content/uploads/2017/02/perro-3-e1561679226953.jpg",],
            index:0
        }
    },
    methods: {
        siguiente(){
            this.frame()
            
            const largo = this.elementos.length
            this.index = this.index + 1
            

            if(this.index == largo){
                this.index = 0
            }
            
        },
        anterior(){
            this.frame()
            const largo = this.elementos.length
            this.index = this.index - 1
            if(this.index == -1){
                this.index = largo-1
            }
        },
        frame(){

            const elemento = document.querySelector('.imagen')
            
            elemento.classList.add('animate__animated', 'animate__pulse');
            elemento.style.setProperty('--animate-duration', '0.25s');

            const myTimeout = setTimeout(myGreeting, 250);

            function myGreeting() {
                elemento.classList.remove('animate__animated', 'animate__pulse');
            }

        }
    },

}
</script>

<style scoped>

.caja{
    background: rgba(132, 132, 132, 0);
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    
}
.imagen{
    text-align: center;
    color: white;
    transition: 0.5s;
    width: 100%;
    height: 200px;
    
}
.imagen img{
    width: 100%;
    height: auto;
    
}
@supports(object-fit: cover){
    .imagen img{
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
}
.navegacion{
    display: flex;
    position: relative;
    widows: 100%;
    bottom: 55%;
    justify-content: space-between;

}

.nav-izquierda{
    position: relative;
    color: rgb(0, 0, 0);
    right: 5%;
    cursor: pointer;
    transition: 0.5s;
}
.nav-derecha{
    position: relative;
    float: right;
    left: 5%;
    color: rgb(0, 0, 0);
    cursor: pointer;
    transition: 0.5s;
}


</style>