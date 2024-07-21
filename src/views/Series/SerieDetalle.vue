<template>
  <div>
    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-12 lg:col-span-3 bg-[#fcfce2] grid justify-center">
        <h3 class="font-bold text-teal-700 text-3xl lg:text-5xl mt-10">{{store.one_serie.nombre}}</h3>
        <img :src="store.one_serie.imagen" 
        :alt="store.one_serie.nombre" class="h-96 pt-6 mx-auto">
        <span class="mt-10 font-semibold text-center"> <a :href="store.one_serie.sitio" target="_blank" rel="noopener noreferrer"><span class="text-blue-500">IMDB: </span> {{store.one_serie.nombre}}</a> </span>
        <span class="mt-10 font-semibold text-center"><span class="text-blue-500">Fecha: </span>{{store.one_serie.fecha}}</span>
        <span class="mt-10 text-center font-semibold"><span class="text-blue-500">Estado: </span>{{store.one_serie.estado == 'F' ? 'FINALIZADO' : store.one_serie.estado == 'E' ? 'EMISIÓN' : 'PENDIENTE' }}</span>
        <span class="mt-10 mb-10 font-semibold text-center"><span class="text-blue-500">Visualización: </span>{{ store.one_serie.visualizacion == 3 ? 'TERMINADO' : store.one_serie.visualizacion == 2 ? 'PENDIENTE' : 'VIENDO' }} </span>
      </div>
      <div class="col-span-12 lg:col-span-9 bg-[#fcfce2]">
        <Temporadas />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useSerieStore } from '@/stores/serie';
  import { onBeforeMount } from 'vue';
  import { useRoute, onBeforeRouteLeave } from "vue-router"
  import Temporadas from '../../components/Temporadas.vue';
  const route = useRoute();
  const store = useSerieStore();
  const estadoClasses = {
                'F': 'text-red-500',
                'E': 'bg-green-500',
                'P': 'bg-sky-500'
            };
  const estadoTextos= {
                'F': 'FINALIZADO',
                'E': 'EMISION',
                'P': 'PENDIENTE'
            };
  onBeforeMount(() => {
    store.id = route.params.id
    store.getOneSerie();

  });
</script>

<style lang="css" scoped>

</style>
