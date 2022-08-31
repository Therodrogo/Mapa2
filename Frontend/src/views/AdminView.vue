<template>
    <div class="contenedor2">
        <vs-sidebar v-model="active" open relative square notShadow hover-expand reduce>
        <template #logo>
        <!-- ...img logo -->
        </template>

        <vs-sidebar-item id="inicio">
        <template #icon>
            <span class="material-icons-round">
            home
            </span>
        </template>
            Inicio
        </vs-sidebar-item>


        <vs-sidebar-group>
            <template #header>
                <vs-sidebar-item arrow>
                <template #icon>
                    <span class="material-icons-round">
                    dashboard
                    </span>
                </template>
                Gestionar cartas
                </vs-sidebar-item>
            </template>

            <vs-sidebar-item id="crearCarta">
                <template #icon>
                    <span class="material-icons-round">
                    add
                    </span>
                </template>
                Crear carta
            </vs-sidebar-item>
            <vs-sidebar-item id="editarCarta">
                <template #icon>
                    <span class="material-icons-round">
                    edit
                    </span>
                </template>
                Editar cartas
            </vs-sidebar-item>
            </vs-sidebar-group>
        
        
        
        </vs-sidebar>
       <div class="caja2">
            <CrearCarta v-if="active=='crearCarta'"/>
       </div>
        
        
        
        
        
    </div>
</template>

<script>
import CrearCarta from '@/components/CrearCarta.vue'
export default {
    data:() => ({
        active: 'inicio',
    }),
    components:{
        CrearCarta
    }
};
</script>

<style scoped>
.contenedor2{
    display: flex;
    font-family: 'Roboto', sans-serif;
}

.caja2{
    width: 100%;
}

</style>