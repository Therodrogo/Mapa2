import Vue from 'vue'
import Vuex from 'vuex'




Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map:null,
    token:'pk.eyJ1IjoidGhlcm9kcm9nbyIsImEiOiJjbDIxYTNlMG4xNGlyM2puM3JuemU5ZThvIn0.JNkviaRn-Zb2qdTue-L4VQ',
    cartas: {},
    edificioSelecionado:null,
    salaMarcada:"",
    darkModo:false,
    style:"mapbox://styles/therodrogo/cl21eq4i2000d14o62ytfatjq",
    styleDay:"mapbox://styles/therodrogo/cl21eq4i2000d14o62ytfatjq",
    styleDark:"mapbox://styles/therodrogo/cl26vlm2v001o15nkk0ouo4j1",
    colorPrincipal:'#313C75',

    estadoInfoEdificio:false,


    Edificios : [
      {
          coordenadas:[-71.22894013559387, -35.002824873000314],
          icono:"https://img.icons8.com/ios-filled/344/4a90e2/library.png",
          nombre: "Biblioteca",
          foto:""
      }
      ,
      {
          coordenadas:[-71.2302405610473, -35.00213003797558],
          icono:"https://img.icons8.com/external-glyph-wichaiwi/344/4a90e2/external-mathematics-statistical-analysis-glyph-wichaiwi.png",
          nombre:"Servicios Multiples",
          foto:"https://i.ibb.co/7C8VYBR/multiples.png"
      },
      {
        coordenadas: [-71.23020173932005, -35.00298450172138],
        icono:"https://img.icons8.com/ios-filled/344/4a90e2/gum-.png",
        nombre:"Gimnacio",
        foto:""
      },
      {
        coordenadas:[-71.229743, -35.001366],
        icono:"https://img.icons8.com/external-flatarticons-blue-flatarticons/344/external-entrance-usa-flatarticons-blue-flatarticons-2.png",
        nombre:"Entrada Principal",
        foto:""
      },
      {
        coordenadas:[-71.23095415504667, -35.00135123097902],
        icono:"https://img.icons8.com/external-kiranshastry-solid-kiranshastry/344/4a90e2/external-mine-investment-kiranshastry-solid-kiranshastry.png",
        nombre:"Edificio de Minas",
        foto:""
      },
      {
        coordenadas:[-71.22886378003142, -35.002003009634954],
        icono:"https://img.icons8.com/ultraviolet/344/robot--v1.png",
        nombre:"Edificio de Mecanica",
        foto:""
      },
      {
        coordenadas:[-71.2291604784214, -35.003168465316016],
        icono:"https://img.icons8.com/ultraviolet/344/hammer.png",
        nombre:"Edificio de Construccion",
        foto:""
      },
      {
        coordenadas:[-71.22915475374442, -35.00365484351161],
        icono:"https://img.icons8.com/fluency-systems-filled/344/4a90e2/coliseum.png",
        nombre:"Auditorio I+D",
        foto:""
      },
      {
        coordenadas:[-71.22979433407157, -35.0017047386893],
        icono:"https://img.icons8.com/color/344/link-company-child.png",
        nombre:"Facultad de Ingenieria",
        foto:""
      },
      {
        coordenadas:[-71.22999896811982, -35.002471304966534],
        icono:"https://img.icons8.com/external-phatplus-solid-phatplus/344/4a90e2/external-laboratory-virus-transmission-phatplus-solid-phatplus.png",
        nombre:"Edificio Laboratorios",
        foto:""
      },
      {
        coordenadas:[-71.22980662330485, -35.0020445830408],
        icono: "https://img.icons8.com/ios-glyphs/344/4a90e2/education.png",
        nombre:"Edificio Bienestar Estudiantil",
        foto:""
      },
      {
        coordenadas:[-71.23127102, -35.0018257],
        icono:"https://img.icons8.com/ios-filled/344/4a90e2/electrical.png",
        nombre:"Edificio de Electrica",
        foto:""
      },
      {
        coordenadas: [-71.22897841350172, -35.002423278615076],
        icono:"https://img.icons8.com/external-icongeek26-glyph-icongeek26/344/4a90e2/external-cabin-russia-icongeek26-glyph-icongeek26.png",
        nombre:"Edificios E (Cabañas)",
        foto:""
      },
      {
        coordenadas:[-71.22955876785723, -35.00311601562916],
        icono:"https://img.icons8.com/ios-filled/344/4a90e2/book.png",
        nombre:"Salas S",
        foto:""
      },
    ],
    Salas:[
      {
        nombre: "Laboratorio 2",
        nombreEdificio:"Edificio Laboratorios"
      },
      {
        nombre: "Laboratorio 3",
        nombreEdificio:"Edificio Laboratorios"
      },
      {
        nombre: "Sala 26",
        nombreEdificio:"Edificio Laboratorios"
      },
      {
        nombre:"Sala 11",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala 12",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala 13",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala 14",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala 21",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala 22",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala 23",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala 24",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala 25",
        nombreEdificio: "Servicios Multiples"
      },
      {
        nombre:"Sala E-1",
        nombreEdificio: "Edificios E (Cabañas)"
      },
      {
        nombre:"Sala E-2",
        nombreEdificio: "Edificios E (Cabañas)"
      },
      {
        nombre:"Laboratorio Universia",
        nombreEdificio: "Biblioteca"
      },
      {
        nombre:"Auditorio Jorge Osandón",
        nombreEdificio: "Biblioteca"
      },
      {
        nombre:"Sala C-1",
        nombreEdificio: "Edificio de Construccion"
      },
      {
        nombre:"Sala C-2",
        nombreEdificio: "Edificio de Construccion"
      },
      {
        nombre:"Sala C-3",
        nombreEdificio: "Edificio de Construccion"
      },
      {
        nombre:"Sala C-4",
        nombreEdificio: "Edificio de Construccion"
      },
      {
        nombre:"Sala C-5",
        nombreEdificio: "Edificio de Construccion"
      },
      {
        nombre:"Sala C-6",
        nombreEdificio: "Edificio de Construccion"
      },
      {
        nombre:"Sala 7",
        nombreEdificio: "Edificio I+D"
      },
      {
        nombre:"Auditorio I+D",
        nombreEdificio: "Edificio I+D"
      },
      
    ]



  },
  getters: {
    


  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
