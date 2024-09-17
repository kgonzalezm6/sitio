<template>
    <div>
        <div class="flex w-40 bg-[#1355BF] h-16 rounded-br-full justify-center">
            <span class="font-monserrat font-extrabold text-[#EDBF18] text-xl">
                <Icon icon="fa-solid fa-film" class="mt-4 text-slate-200 text-2xl" />
                DETALLE
            </span>
            <!-- #BF8713 -->
        </div>
        <div class="grid gap-5 grid-cols-12 mt-16">
            <div class="col-span-4 h-[17.5rem] w-[12rem] rounded-lg ml-9 border-solid 
                    border-[0.375rem] border-white">
                <img :src="serieStore.oneserie.IMAGEN_SERIE" :alt="serieStore.oneserie.NOMBRE_SERIE">
            </div>
            <div class="col-span-8">

            </div>
        </div>
        <div class="ml-24 mt-2">
            <Icon icon="fa-pen-to-square" class="text-blue-800 text-3xl" />
            <Icon icon="fa-trash" class="text-red-500 text-3xl ml-4" />
        </div>
        <div class="w-full h-8 mt-8" v-if="serieStore.datosListos">
            <Tabs :tabs="serieStore.tabs" />
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useSerieStore } from '../../stores/serie';
import { useRoute, onBeforeRouteLeave } from "vue-router"
import Tabs from '../TabComponent.vue'
const route = useRoute();
const serieStore = useSerieStore();
const isValid = ref(false);

onBeforeMount(() => {
    serieStore.id = route.params.id
    serieStore.getOneSerie();
});
onMounted(() => {
    
});

onBeforeRouteLeave((to, from, next) => {
  // Realiza acciones antes de abandonar la ruta
  serieStore.oneserie = [];
  serieStore.datosListos = false;

  // Llama a next() para continuar con la transición de la ruta
  next();
});
</script>
<style></style>