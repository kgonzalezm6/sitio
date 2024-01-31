<template>
    <div>
        <div class="flex justify-center items-center mt-10 gap-2">

                <btn icon="plus" class="bg-green-500 text-white font-bold rounded-full h-16 w-16 border border-green-700 hover:scale-125 hover:bg-green-600 transition-all" @click="peliculaStore.isNew = true"/>
                <btn icon="code-merge" class="bg-teal-500 text-white font-bold rounded-full h-16 w-16 border border-teal-700 hover:scale-125 hover:bg-teal-600 transition-all" @click="peliculaStore.isUnir = true"/>
                <btn icon="c" class="bg-blue-500 text-white font-bold rounded-full h-16 w-16 border border-blue-700 hover:scale-125 hover:bg-blue-600 transition-all" @click="redirect('c')"/>
                <btn icon="e" class="bg-orange-500 text-white font-bold rounded-full h-16 w-16 border border-orange-700 hover:scale-125 hover:bg-orange-600 transition-all" @click="redirect('e')"/>
    
        </div>

        <div>
            <datatable :data="peliculaStore.peliculas" :headers="peliculaStore.headers">
                <template #NOMBRE_PELICULA="{ item }">
                    <router-link :to="{ name: 'peliculadetalle', params: { id: item.ID_PELICULA } }">
                        <span>{{item.NOMBRE_PELICULA}}</span>
                    </router-link>
                </template>
                <template #ESTADO_PELICULA="{ item }">
                    <div class="border rounded-full text-white"
                        :class="[item.ESTADO_PELICULA ? 'bg-green-400' : 'bg-red-400']">{{ item.ESTADO_PELICULA ? 'Activo' :
                            'Inactivo' }}</div>
                </template>
                <template #actions="{ item }">
                    
                    <icon icon="pen-to-square" @click="peliculaStore.open(item, 2)"
                        class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                    <icon icon="trash" @click="peliculaStore.open(item, 3)" class="text-3xl text-red-500 hover:scale-125" />
                </template>
            </datatable>
        </div>
        <EditPelicula />
        <CrearPelicula />
        <UnirPelicula />
        <!-- <DeletePELICULA /> -->
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { onBeforeRouteLeave, useRouter } from "vue-router"
import { usePeliculaStore } from '../stores/pelicula';
import { useGlobalStore } from '../stores/global';
import EditPelicula from '../components/serie/EditPelicula.vue';
import CrearPelicula from '../components/serie/CrearPelicula.vue';
import UnirPelicula from '../components/serie/UnirPelicula.vue'
// import DeletePELICULA from '../components/serie/DeletePELICULA.vue'
const peliculaStore = usePeliculaStore();
const globalStore = useGlobalStore();
const router = useRouter();
globalStore.changeTitlePage('peliculas');
onBeforeMount(() => {
    peliculaStore.getPelicula();

});
onBeforeRouteLeave((to, from, next) => {
    globalStore.changeTitlePage('');
  next();
});
function redirect(ruta) {
    if (ruta == 'c') {
        router.push('/chica')
    } else {
        router.push('/empresa')
    }
   
};
</script>

