<template>
  <div>
    <div v-if="muestrate">
      <InformacionEdifcio
        @reserve="porfaFunca"
        :texto="palabra"
        :urlFoto="urlFoto"
        :descripcion="descripcion"
        :salas="salasEdificio"
        :algoalgo="monitomonito"
      />

    </div>
    
    <div id="map" />
  </div>
</template>

<script>
var muestrate = ref(false);
var palabra = ref("");
var urlFoto = ref("");
var descripcion = ref("");
var salasEdificio = ref([]);
var monitomonito = ref("lalalalala");
var posiMonito = ref("lelel");
var rutaOpcion=ref();

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref } from "vue";
import InformacionEdifcio from "./InformacionEdifcio.vue";
import { toRef } from 'vue'

export default {
  components: {
    InformacionEdifcio,
  },
  data() {
    return {
      estado: false,
      salas2: [],
      hola: "hola soy yo"
    }
  },
  methods: {
    escribir(){
      console.log(this.hola)
    },
    //BORRAR VENTANA INFORMACION EDIFICIO
    porfaFunca(){
      muestrate.value=!muestrate.value;
    }
      
  },
  created(){
    this.escribir()

  },
  props:{
    nombreEdificioCurso:String,
  },

  setup(props) {
    onMounted(() => {
      console.log("fin")
      mapboxgl.accessToken =
        "pk.eyJ1IjoidGhlcm9kcm9nbyIsImEiOiJjbDIxYTNlMG4xNGlyM2puM3JuemU5ZThvIn0.JNkviaRn-Zb2qdTue-L4VQ";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/therodrogo/cl26vlm2v001o15nkk0ouo4j1",
        center: [-71.23, -35.003],
        zoom: 16.67,
        //scrollZoom: false
      });
     
      map.on("load", () => {
        //Ruta desde la entrada al camino principal,
        //COMPLETA EL MAPA UN POCO
        map.addSource("route2", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [-71.229743, -35.001366],
                [-71.22994511197385, -35.00155877796714],
              ],
            },
          },
        });

        map.addLayer({
          id: "route2",
          type: "line",
          source: "route2",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#FFFFFF",
            "line-width": 3,
          },
        });
      });
      map.on('dblclick', (e) => {
        e.preventDefault();
      });
      map.on('mouseover', () => {
        if (muestrate.value == false) {
            //borrarRuta();
            //desestacarMarkers();
        }

      })
      
      // Variable para indicar si un edifico se encuentra destacado
      var edificioDestacado=false;
      //Variable para indentificar el numero del edificioDestacado
      var nroDestacado;
      //Array de los markers de edicios
      var arrayMarkers = [];
      //Array marker
      var nombreArrayMarkers = [];

      var disMonito = document.createElement("div");
      disMonito.className = "marker";
      disMonito.style.backgroundImage = "url('https://i.ibb.co/ySgwGTJ/monito.png')";
      disMonito.style.width = "60px";
      disMonito.style.height = "60px";
      disMonito.style.backgroundSize = "35px";
      disMonito.style.zIndex = "50";

      

      //Marker
      const marker_monito = new mapboxgl.Marker(disMonito);[-71.2297088791571,-35.00274229287036]
      marker_monito.setLngLat([-71.2297088791571,-35.00274229287036]);
      monitomonito.value=""+marker_monito.getLngLat();
      posiMonito.value=""+marker_monito.getLngLat();
      //monitomonito.value="[-71.2297088791571,-35.00274229287036]";

      marker_monito.addTo(map);

      marker_monito.setDraggable(true);
      

      /*MIENTRAS MAS ARRIBA MAYOR ES LA LAT*/
      marker_monito.getElement().addEventListener("click", () => {
        const title = toRef(props, 'nombreEdificioCurso')
        rutaOpcion.value=false
        const nombre = title.value
        console.log(nombre)

        API.CercanoUsuario(marker_monito.getLngLat().lng,marker_monito.getLngLat().lat)  
        const  res = API.setGraphInfo(nombre)      
        if(res!=false){
          crearRuta( res)
          desestacarMarkers();
        }
        var indexOP;
        for (let index = 0; index < nombreArrayMarkers.length; index++) {
          console.log("LALALALALALAL "+nombreArrayMarkers[index])
          if (nombre==nombreArrayMarkers[index]) {
            var markerRON = arrayMarkers[index];
            indexOP=index;
          }
        }
        if(markerRON!=null){
        
          arrayMarkers[indexOP+1].getElement().style.width = "60px";
          arrayMarkers[indexOP+1].getElement().style.height = "60px";
          arrayMarkers[indexOP+1].getElement().style.transition = "0.2s";
          arrayMarkers[indexOP+1].getElement().style.borderRadius = "15%";
          arrayMarkers[indexOP+1].getElement().style.border = "2px solid #ED0C60";
        }
         //Si la ventana está oculta la mostramos
        muestrate.value=false;
            
        edificioDestacado=true;
        
      }); 
        

      marker_monito.on("dragstart", (e) => {
        console.log(e)
        //Borramos la ruta cuando mueva el monito
        borrarRuta();
        //Dejamos de destacar el edificio (Recorriendo la lista)
        //desestacarMarkers();
        //Cerramos la ventana del edifico
        //muestrate.value = false;
      });

       marker_monito.on("dragend", (e) => {
       
        posiMonito.value=""+marker_monito.getLngLat();
        monitomonito.value=""+marker_monito.getLngLat();
        console.log(e)
       if(rutaOpcion.value){
          
          API.CercanoUsuario(marker_monito.getLngLat().lng,marker_monito.getLngLat().lat)         
          crearRuta(API.setGraphInfo(palabra.value))
       }else{
          const title = toRef(props, 'nombreEdificioCurso')
          
          const nombre = title.value
          console.log(nombre)

          API.CercanoUsuario(marker_monito.getLngLat().lng,marker_monito.getLngLat().lat)  
          const  res = API.setGraphInfo(nombre)      
          if(res!=false){
            crearRuta( res)
            
          }
       }
       
        

      });

      //Crea todos los edificios, la cree para podere minimizar el codigo de abajo :9
      crearMarkersEdificios();

      //Creación de Markers
      function crearMarkersEdificios() {
        //Gimnasio (Está separado de los demas porque tiene la linea)
        var coordenada = [-71.23020173932005, -35.00298450172138];
        var gimnasio = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/gum-.png",
          coordenada
        );
        agregarEventoClick(
                gimnasio,
                "Gimnasio",
                "https://i.ibb.co/RBtgwP3/gimnacio.png",
                "Solo se imparten cursos deportivos",
                false
        );
        nombreArrayMarkers.push("Gimnasio");
             
        //Agregamos el Gym a la lista de Markers
        arrayMarkers.push(gimnasio);

        //ENTRADA
        coordenada = [-71.229743, -35.001366];
        var entrada = agregarMarker(
          "https://img.icons8.com/external-flatarticons-blue-flatarticons/344/external-entrance-usa-flatarticons-blue-flatarticons-2.png",
          coordenada
        );

        //Fuuncion que agrega el evento click, lo hice para reducir lineas, el ultimo elemento que se entrega es si tiene salas. Si no = true, si tiene = false
        agregarEventoClick(
          entrada,
          "Entrada",
          "",
          "Entrada Principal Paradero",
          false
        );
nombreArrayMarkers.push("Entrada");
        //MINAS
        coordenada = [-71.23095415504667, -35.00135123097902];
        var minas = agregarMarker(
          "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/4a90e2/external-mine-investment-kiranshastry-solid-kiranshastry.png",
          coordenada
        );
        agregarEventoClick(
          minas,
          "Edificio Minas",
          "https://i.ibb.co/zZC4j59/minas.png",
          "",
          true,
        );
nombreArrayMarkers.push("Edificio Minas");
        //MECANICA
        coordenada = [-71.22886378003142, -35.002003009634954];

        var mecanica = agregarMarker(
          "https://img.icons8.com/ultraviolet/344/robot--v1.png",
          coordenada
        );
        agregarEventoClick(
          mecanica,
          "Edificio de Mecanica",
          "https://i.ibb.co/7tSm92s/mecanica.png",
          "Incluye a Mecatrónica",
          true,

        );
nombreArrayMarkers.push("Edificio de Mecanica");
        //CONSTRUCCION
        coordenada = [-71.2291604784214, -35.003168465316016];

        var construccion = agregarMarker(
          "https://img.icons8.com/ultraviolet/344/hammer.png",
          coordenada
        );
        agregarEventoClick(
          construccion,
          "Edificio Construccion",
          "https://i.ibb.co/D9rc60t/construccion.png",
          "Incluye a Obras Civiles",
          true,
        );
        nombreArrayMarkers.push("Edificio Construccion");

        //AUDITORIO
        coordenada = [-71.22915475374442, -35.00365484351161];
        var auditorio = agregarMarker(
          "https://img.icons8.com/fluency-systems-filled/344/4a90e2/coliseum.png",
          coordenada
        );
        agregarEventoClick(
          auditorio,
          "Edificio I+D",
          "https://i.ibb.co/Ct9530g/ID.png",
          "Edificio de intercambio de idiomas",
          true,

        );
nombreArrayMarkers.push("Edificio I+D");
        //EDIFICIO AZUL
        coordenada = [-71.22979433407157, -35.0017047386893];
                
        var facultad = agregarMarker(
          "https://img.icons8.com/color/344/link-company-child.png",
          coordenada
        );
        agregarEventoClick(
          facultad,
          "Facultad de Ingeniería",
          "https://i.ibb.co/dKb7b8b/facultad.png",
          "Solo administrativo",
          false,

        );
nombreArrayMarkers.push("Facultad de Ingeniería");
        //EDIFICIO VERDE
        coordenada = [-71.22999896811982, -35.002471304966534];

        var laboratorio = agregarMarker(
          "https://img.icons8.com/external-phatplus-solid-phatplus/344/4a90e2/external-laboratory-virus-transmission-phatplus-solid-phatplus.png",
          coordenada
        );
        agregarEventoClick(
          laboratorio,
          "Edificios Laboratorios",
          "https://i.ibb.co/ZJjwCRx/laboratorio.png",
          "",
          true,

        );
nombreArrayMarkers.push("Edificios Laboratorios");
        //Bienestar Estudiantil
        coordenada = [-71.22980662330485, -35.0020445830408];
 
        var bienestar = agregarMarker(
          "https://img.icons8.com/ios-glyphs/344/4a90e2/education.png",
          coordenada
        );
        agregarEventoClick(
          bienestar,
          "Edificio Estudiantil",
          "https://i.ibb.co/0YHF0hD/bienestar.png",
          "",
          true,

        );
nombreArrayMarkers.push("Edificio Estudiantil");
        //Biblioteca
       
        coordenada =[-71.22894013559387, -35.002824873000314];
        
        var biblioteca = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/library.png",
          coordenada
        );
        agregarEventoClick(
          biblioteca,
          "Biblioteca",
          "https://i.ibb.co/R6WsF6Z/biblioteca.png",
          "Al lado de esta es el auditorio",
          true,
  
        );
nombreArrayMarkers.push("Biblioteca");
        //Electrica
        coordenada = [-71.23129613592188, -35.0020916923508];
        var electrica = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/electrical.png",
          coordenada
        );
        agregarEventoClick(
          electrica,
          "Eléctrica",
          "https://i.ibb.co/k8374K4/electrica.png",
          "No se imparten cursos en este edificio por el momento",
          false
        );
        nombreArrayMarkers.push("Eléctrica");

        //CABAÑA MADERA
        coordenada = [-71.22897841350172, -35.002423278615076];
        var cabaña = agregarMarker(
          "https://img.icons8.com/external-icongeek26-glyph-icongeek26/344/4a90e2/external-cabin-russia-icongeek26-glyph-icongeek26.png",
          coordenada
        );
        agregarEventoClick(
          cabaña,
          "Salas de Madera",
          "https://i.ibb.co/ZdrjXrt/maderas.png",
          "",
          true,

        );
nombreArrayMarkers.push("Salas de Madera");
        //SERVICIOS MULTIPLES
        coordenada = [-71.2302405610473, -35.00213003797558];
        var multiples = agregarMarker(
          "https://img.icons8.com/external-glyph-wichaiwi/344/4a90e2/external-mathematics-statistical-analysis-glyph-wichaiwi.png",
          coordenada
        );
        agregarEventoClick(
          multiples,
          "Servicios Multiples",
          "https://i.ibb.co/7C8VYBR/multiples.png",
          "",
          true,
        );
nombreArrayMarkers.push("Servicios Multiples");
        //COE
        coordenada = [-71.22955876785723, -35.00311601562916];
        var coe = agregarMarker(
          "https://img.icons8.com/ios-filled/344/4a90e2/book.png",
          coordenada
        );
        agregarEventoClick(
          coe,
          "Edificio Salas S",
          "https://i.ibb.co/D4BCFSf/salasS.png",
          "",
          true,
        );
        nombreArrayMarkers.push("Edificio Salas S");

        const navegacionControl = new mapboxgl.NavigationControl();
        map.addControl(navegacionControl, "bottom-right");
        map.setMinZoom(16.39);
        map.setMaxZoom(18);
      }

      function crearRuta(coordenadas) {

        if(map.getSource("ruta")!==undefined){
          map.removeLayer("ruta")
          map.removeSource("ruta")
        }
        map.addSource("ruta", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordenadas,
            },
          },
        });
        map.addLayer({
          id: "ruta",
          type: "line",
          source: "ruta",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#ED0C60", //color rojo para la ruta
            "line-width": 4,
          },
        });
      }
      function borrarRuta() {
         if(map.getSource("ruta")!==undefined){
          map.removeLayer("ruta")
          map.removeSource("ruta")
        }
      }
     
      // Funcion que agrega un Marker al mapa, se le entrega el icono, la coordenada y un popup.
      function agregarMarker(icono, coordenada, popup) {
        //Elemento
        var el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(` + icono + `)`;
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.backgroundSize = "100%";
        //   el.style.display="inline-block";
        // el.style.position="absolute";

        //Marker
        const marker = new mapboxgl.Marker(el);
        marker.setLngLat(coordenada);
        marker.setPopup(popup);
        marker.addTo(map);
      
        //Eventos Marker
        //Evento de pasar el mouse por encima
        marker.getElement().addEventListener("mouseover", () => {
          marker.getElement().style.width = "60px";
          marker.getElement().style.height = "60px";
          marker.getElement().style.transition = "0.2s";
          marker.getElement().style.borderRadius = "15%";
          marker.getElement().style.border = "2px solid #ED0C60";
          
    
        });
        //Evento de quitar el mouse de encima
        marker.getElement().addEventListener("mouseleave", () => {
          //Si el edificio no se encuentra destacado (No se le ha echo click) este vuelve a su estado natural.
          if (!edificioDestacado) {
            
            marker.getElement().style.width = "30px";
            marker.getElement().style.height = "30px";
            marker.getElement().style.backgroundColor = "transparent";
            marker.getElement().style.border = "none";
            marker.getElement().style.transition = "none";
          }else{
            //Si existe un edifico destacado, hacemos que deje de destacarse si no es el ya destacado.
       
            if (arrayMarkers[nroDestacado]!=marker) {
                marker.getElement().style.width = "30px";
                marker.getElement().style.height = "30px";
                marker.getElement().style.backgroundColor = "transparent";
                marker.getElement().style.border = "none";
                marker.getElement().style.transition = "none";
            }
              
          
          }

        });
        //Lo agregmos a la lista de markers
        //Agregamos el Gym a la lista de Markers
        arrayMarkers.push(marker);

        
        return marker;
      }

      function desestacarMarkers(){
        for (let index = 0; index < arrayMarkers.length; index++) {
          arrayMarkers[index].getElement().style.width = "30px";
          arrayMarkers[index].getElement().style.height = "30px";
          arrayMarkers[index].getElement().style.backgroundColor = "transparent";
          arrayMarkers[index].getElement().style.border = "none";
          arrayMarkers[index].getElement().style.transition = "none";
        }
        
        edificioDestacado=false;
      }

      async function getSalas(){
              salasEdificio.value = await API.getSalasByName(palabra.value);
              
      }
      async function agregarEventoClick(
          marker,
          e_palabra,
          e_url,
          e_descripcion,
          e_salas,
      ){
          marker.getElement().addEventListener("click", () => {
            //Si la ventana está oculta la mostramos
            rutaOpcion.value=true
            if (!muestrate.value) {
              muestrate.value = !muestrate.value;
              palabra.value = e_palabra;
              urlFoto.value = e_url;
              descripcion.value = e_descripcion;
              salasEdificio.value = getSalas()
            }else{
              //Si no está oculta actualizamos sus datos
              palabra.value = e_palabra;
              urlFoto.value = e_url;
              descripcion.value = e_descripcion;
              salasEdificio.value = getSalas()
            }
           
          
            //"Desestacamos" todos los edificos
            desestacarMarkers();
            //Se destaca el edifico

            if (edificioDestacado) {
              marker.getElement().style.width = "30px";
              marker.getElement().style.height = "30px";
              marker.getElement().style.backgroundColor = "transparent";
              marker.getElement().style.border = "none";
              marker.getElement().style.transition = "none";
              edificioDestacado=false;
            
              
            }else{
              marker.getElement().style.width = "60px";
              marker.getElement().style.height = "60px";
              marker.getElement().style.transition = "0.2s";
              marker.getElement().style.borderRadius = "15%";
              marker.getElement().style.border = "2px solid #ED0C60";
              edificioDestacado=true;
              
            }
            //Se indica que nro de edicio fue destacado
            for (let index = 0; index < arrayMarkers.length; index++) {
              if (arrayMarkers[index]==marker) {
                nroDestacado=index;
                console.log("Edifico destacado nro: "+nroDestacado);
              }
              
            }
            
            //Tiene salas o no
            if (e_salas == false) {
            salasEdificio.value = ["---"];
            } else {
              getSalas(palabra.value)
            }
          

            API.CercanoUsuario(marker_monito.getLngLat().lng,marker_monito.getLngLat().lat)         
            crearRuta(API.setGraphInfo(palabra.value))
        
        });
      }
    });
    
    return {
      muestrate,
      palabra,
      urlFoto,
      descripcion,
      salasEdificio,
      monitomonito,
      posiMonito,
    };

  },

};
</script>

<style scoped>
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 1px;
}
</style>