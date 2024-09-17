<template>
    <div>
        <simple-tabs :tabs="['Datos', 'Estadisticas']" class="mt-10">
            <template #tab-0>
                <div class="flex items-center mt-10 justify-center gap-2">
                    <button class="bg-green-500 text-white font-bold rounded-full h-16 w-16 border border-green-700 hover:scale-125 hover:bg-green-600 transition-all" 
                        @click="store.option_crear = true"> <Icon icon="plus" />
                    </button>
                    <button class="bg-blue-500 text-white rounded-full h-16 w-16 border 
                        border-blue-900 hover:bg-blue-900 transition-all" 
                        @click="redirect()"> <span class="font-bold">T</span>
                    </button>  
                </div>
                <datatable :data="store.series" :headers="store.headers" :loading="store.loading_series">
                    <template #sitio="{ item }">
                        <a :href="item.sitio" target="_blank">{{ item.nombre }}</a>
                    </template>
                    <template #estado="{ item}">
                        <span class="p-2 rounded-2xl text-white" :class="estadoClasses[item.estado]">{{ estadoTextos[item.estado] }}</span>
                    </template>
                    <template #imagen="{ item }">
                        <div class="mx-auto w-48">
                            <router-link :to="{ name: 'seriedetalle', params: { id: item.id_serie } }">
                                <img :src="item.imagen" :alt="item.nombre" class="h-40">
                            </router-link>
                        </div>
                    </template>
                    <template #actions="{ item }">
                        <Icon icon="pen-to-square" @click="store.open(item, 1)"
                            class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                        <Icon icon="trash" @click="store.open(item, 2)" 
                        class="text-3xl text-red-500 hover:scale-125" />
                    </template>
                </datatable>
            </template>
        </simple-tabs>
    </div>
    <EditarSerie />
    <EliminarSerie />
    <CrearSerie />
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useSerieStore } from '@/stores/serie'
import EditarSerie from '../../components/serie/EditarSerie.vue';
import EliminarSerie from '../../components/serie/EliminarSerie.vue';
import CrearSerie from '../../components/serie/CrearSerie.vue';
const store = useSerieStore();
const estadoClasses = {
                'F': 'bg-red-500',
                'E': 'bg-green-500',
                'P': 'bg-sky-500'
            };
const estadoTextos= {
                'F': 'FINALIZADO',
                'E': 'EMISION',
                'P': 'PENDIENTE'
            };

onBeforeMount(() => {
    store.getSerie();
});
</script>

<style lang="css" scoped>

</style>