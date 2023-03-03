<template>
  <div>
    <div id="mapContainer" class="basemap"></div>

  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import Swal from "sweetalert2"

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoidGhlcm9kcm9nbyIsImEiOiJjbDIxYTNlMG4xNGlyM2puM3JuemU5ZThvIn0.JNkviaRn-Zb2qdTue-L4VQ',
      map: null,

    };
  },
  methods: {
    crearMarker() {

      this.$store.state.Edificios.forEach(e => {
        var estadoSeleccion = false
        var el = document.createElement("div");
        el.className = e.nombre;
        el.style.backgroundImage = `url(` + e.icono + `)`;

        el.style.backgroundSize = "100%";
        
        if (this.$store.state.edificioSelecionado == el.className) {
          console.log("deberia crecer")
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.border = "solid 1px red"
          el.style.borderRadius ="15%"
          estadoSeleccion = true
        }
        else {
          el.style.width = "35px";
          el.style.height = "35px";
        }


        //Marker
        const marker = new mapboxgl.Marker(el);
        marker.setLngLat(e.coordenadas);
        marker.addTo(this.$store.state.map);

        marker.getElement().addEventListener("click", () => {
          
          this.$store.state.estadoInfoEdificio = true
          this.$store.state.edificioSelecionado = e
          console.log(this.$store.state.edificioSelecionado )
          
          this.$router.push({ path: '/' })
          
        });
        if (!estadoSeleccion) {

         /*  marker.getElement().addEventListener("mouseover", () => {
            marker.getElement().style.width = "60px";
            marker.getElement().style.height = "60px";
            marker.getElement().style.transition = "0.5s";
            //marker.getElement().style.border = "2px solid #ED0C60";


          }); */

          marker.getElement().addEventListener("mouseleave", () => {
            marker.getElement().style.width = "35px";
            marker.getElement().style.height = "35px";
            marker.getElement().style.backgroundColor = "transparent";
            marker.getElement().style.border = "none";
            marker.getElement().style.transition = "none";

          });
        }



      });



    }
  },
  mounted() {
    mapboxgl.accessToken = this.$store.state.token;

    this.$store.state.map = new mapboxgl.Map({
      container: "mapContainer",
      style: this.$store.state.style,
      center: [-71.23, -35.003],
      zoom: 16.4,
      //scrollZoom: false,
    });
    /* this.$store.state.map.dragRotate.disable()
    this.$store.state.map.dragPan.disable();*/
    this.$store.state.map.doubleClickZoom.disable(); 


    this.crearMarker()

  },


};
</script>

<style scoped>
#mapContainer {

  position: absolute;
  width: 100vw;
  height: 100%;
  overflow: hidden;
}
</style>