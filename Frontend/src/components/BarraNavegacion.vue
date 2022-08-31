<template>
    <div class="center examplex">
      <vs-navbar color="#067566" text-white square center-collapsed v-model="active"  >

        <template #left>
          <!-- Logo foto algo -->
        </template>

        <vs-navbar-item to="/" :active="active == 'inicio'" id="inicio" >
            <div class="texto">
                Inicio
            </div>
         
        </vs-navbar-item>

        <vs-navbar-item to="/about" :active="active == 'about'" id="about">
            <div class="texto">
                About
            </div>
        </vs-navbar-item>
        <vs-navbar-item to="/nosotros" :active="active == 'nosotros'" id="nosotros">
            <div class="texto">
                Nosotres
            </div>
        </vs-navbar-item>
        
        <template #right>
          <!-- login cosas asi -->
        </template>

      </vs-navbar>

    </div>
  </template>
  <script>
  export default {
    data:() => ({
      active: 'inicio'
    })
  }
  </script>