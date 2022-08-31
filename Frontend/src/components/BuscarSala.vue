  <template>
    <div class="buscar">
      <vs-button
      :color="this.$store.state.colorPrincipal"
      flat
      :active="active==1 || value!=''"
      @mouseenter="active=1"
      @mouseleave="active=0"
    
      >
      <span @click="seleccionar" class="material-icons-outlined">
          search
      </span>

      <div class="barraBuscar">

      
      <vs-select
        filter
        state="success"
        placeholder="Buscar Sala"
        v-model="value"
      >
        <vs-option  v-for="elemento in $store.state.Salas" :key="elemento.id" :label=elemento.nombre :value=elemento.nombre>
            
          {{elemento.nombre}}

        </vs-option>

        
      </vs-select>
      </div>

      <span @click="value=''" id="close" class="material-icons-outlined">
        close
      </span>
      
    </vs-button>
    </div>
  </template>
  <script>
    export default {
      data:() => ({
        value: '',
        value2: '',
        active:0,
        elemento:{},
        nombreE:""
      }),
      methods:{
        seleccionar(){
          this.$store.state.Salas.forEach(elem => {
            
            if(elem.nombre == this.value){
              this.$store.state.edificioSelecionado = elem.nombreEdificio
            }


          });
          console.log(this.$store.state.edificioSelecionado)

          
          this.$router.push({ path: '/about' })
        }
      }
    }
  </script>
<style scoped>
.buscar{
    position: absolute;
}
.vs-button{
  height: 50px;
}

.barraBuscar{
    transition: 0.5s;
}

#close{
  height: 5px;
  margin-bottom: 15px;
}

</style>