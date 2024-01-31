<template>
    <div>
        <div class="flex items-center mt-10 justify-center gap-2">
            <button class="bg-green-500 text-white font-bold rounded-full h-16 w-16 border border-green-700 hover:scale-125 hover:bg-green-600 transition-all" 
                @click="chicaStore.isNew = true"> <icon icon="plus" />
            </button>
            <button class="bg-blue-500 text-white rounded-full h-16 w-16 border 
                border-blue-700 hover:scale-125 hover:bg-blue-600 transition-all" 
                @click="redirect()"> <span class="font-bold">P</span>
            </button>
           
        </div>
        <div>
            <datatable :data="chicaStore.chicas" :headers="chicaStore.headers">
                <template #SITIO_CHICA="{ item }">
                    <a :href="item.SITIO_CHICA" target="_blank">{{ item.NOMBRE_CHICA }}</a>
                </template>
                <template #FOTO_CHICA="{ item }">
                    <div class="mx-auto w-48">
                        <router-link :to="{ name: 'chicadetalle', params: { id: item.ID_CHICA } }">
                            <img :src="item.FOTO_CHICA" :alt="item.NOMBRE_CHICA" class="h-40">
                        </router-link>
                    </div>
                </template>
                <template #ESTADO_CHICA="{ item }">
                    <div class="border rounded-full text-white p-2"
                        :class="[item.ESTADO_CHICA ? 'bg-green-400' : 'bg-red-400']">{{ item.ESTADO_CHICA ? 'Activo' :
                            'Inactivo' }}</div>
                </template>
                <template #actions="{ item }">
                    <icon icon="pen-to-square" @click="chicaStore.open(item, 1)"
                        class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                    <icon icon="trash" @click="chicaStore.open(item, 3)" 
                    class="text-3xl text-red-500 hover:scale-125" />
                </template>
            </datatable>
        </div>
        <EditChica />
        <CrearChica />
        <DeleteEmpresa />
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useChicaStore } from '../stores/chica';
import { useGlobalStore } from '../stores/global';
import EditChica from '../components/serie/EditChica.vue';
import CrearChica from '../components/serie/CrearChica.vue';
import DeleteEmpresa from '../components/serie/DeleteEmpresa.vue'
import { onBeforeRouteLeave, useRouter } from "vue-router"
const chicaStore = useChicaStore();
const globalStore = useGlobalStore();
const router = useRouter();
globalStore.changeTitlePage('Chicas');
onBeforeMount(() => {
    chicaStore.getChica();
});
onBeforeRouteLeave((to, from, next) => {
    globalStore.changeTitlePage('');
  next();
});
function redirect() {
    router.push('/pelicula')
};
</script>

