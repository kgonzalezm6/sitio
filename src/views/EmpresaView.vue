<template>
    <div>
        <div class=" flex justify-center items-center mt-10 gap-2">
            <btn class="bg-green-500 text-white font-bold rounded-full h-16 w-16 border border-green-700 hover:scale-125 hover:bg-green-600 transition-all" 
            @click="empresaStore.isNew = true"
            icon="plus"/>
            <button class="bg-blue-500 text-white rounded-full h-16 w-16 border 
                border-blue-700 hover:scale-125 hover:bg-blue-600 transition-all" 
                @click="redirect()"> <span class="font-bold">P</span>
            </button>
        </div>
        <div>
            <datatable :data="empresaStore.empresas" :headers="empresaStore.headers">
                <template #SITIO_EMPRESA="{ item }">
                    <a :href="item.SITIO_EMPRESA" target="_blank">{{ item.NOMBRE_EMPRESA }}</a>
                </template>
                <template #FOTO_EMPRESA="{ item }">
                    <div class="bg-gray-700 mx-auto w-48">
                        <router-link :to="{ name: 'empresadetalle', params: { id: item.ID_EMPRESA } }">
                            <img :src="item.FOTO_EMPRESA" :alt="item.NOMBRE_EMPRESA" class="h-8">
                        </router-link>
                    </div>
                </template>
                <template #ESTADO_EMPRESA="{ item }">
                    <div class="border rounded-full text-white"
                        :class="[item.ESTADO_EMPRESA ? 'bg-green-400' : 'bg-red-400']">{{ item.ESTADO_EMPRESA ? 'Activo' :
                            'Inactivo' }}</div>
                </template>
                <template #actions="{ item }">
                    <icon icon="pen-to-square" @click="empresaStore.open(item, 2)"
                        class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                    <icon icon="trash" @click="empresaStore.open(item, 3)" 
                    class="text-3xl text-red-500 hover:scale-125" />
                </template>
            </datatable>
        </div>
        <EditEmpresa />
        <CrearEmpresa />
        <DeleteEmpresa />
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useEmpresaStore } from '../stores/empresa';
import { useGlobalStore } from '../stores/global';
import EditEmpresa from '../components/serie/EditEmpresa.vue';
import CrearEmpresa from '../components/serie/CrearEmpresa.vue';
import DeleteEmpresa from '../components/serie/DeleteEmpresa.vue';
import { onBeforeRouteLeave, useRouter } from "vue-router"
const empresaStore = useEmpresaStore();
const globalStore = useGlobalStore();
globalStore.changeTitlePage('Empresas');
const router = useRouter();
onBeforeMount(() => {
    empresaStore.getEmpresa();
});
onBeforeRouteLeave((to, from, next) => {
    globalStore.changeTitlePage('');
  next();
});
function redirect() {
    router.push('/pelicula')
};
</script>

