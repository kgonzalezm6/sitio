<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useEmpresaStore } from '../stores/empresa';
import { useRoute, onBeforeRouteLeave } from "vue-router"
const route = useRoute();
const empresaStore = useEmpresaStore();
const isValid = ref(false);
import EditEmpresa from '../components/serie/EditEmpresa.vue';
import CrearEmpresa from '../components/serie/CrearEmpresa.vue';
import DeleteEmpresa from '../components/serie/DeleteEmpresa.vue'
onBeforeMount(() => {
  empresaStore.id = route.params.id
  empresaStore.getOneEmpresa();
});
onMounted(() => {

});

onBeforeRouteLeave((to, from, next) => {
  // Realiza acciones antes de abandonar la ruta
  empresaStore.oneempresa = [];
  empresaStore.datosListos = false;

  // Llama a next() para continuar con la transición de la ruta
  next();
});
</script>

<template>
  <div v-if="empresaStore.datosListos">
    <div class="grid gap-2 md:grid-cols-12 sm:grid-cols-4 mt-16">
      <div class="col-span-4 h-[12rem] w-[17.5rem] rounded-lg ml-9 border-solid 
                border-[0.375rem] border-white
                bg-gray-700 flex items-center justify-center">
        <img :src="empresaStore.oneempresa.FOTO_EMPRESA" :alt="empresaStore.oneempresa.NOMBRE_EMPRESA">
      </div>
      <div class="col-span-8">
        <div class="grid grid-cols-4">
          <span class="col-span-2 p-4"> <span class="font-bold">NOMBRE: </span> {{ empresaStore.oneempresa.NOMBRE_EMPRESA }}</span>
          <span class="col-span-2 p-4"><span class="font-bold">SITIO: </span> <a :href="empresaStore.oneempresa.SITIO_EMPRESA" target="_blank" rel="noopener noreferrer" class="text-teal-700 font-bold">{{ empresaStore.oneempresa.NOMBRE_EMPRESA }}</a> </span>
          <div class="col-span-4 p-4"><span class="font-bold">ESTADO: </span><span :class="{'text-green-500 font-bold' : empresaStore.oneempresa.ESTADO_EMPRESA==1, 'text-red-500 font-bold': empresaStore.oneempresa.ESTADO_EMPRESA==0 }">{{empresaStore.oneempresa.ESTADO_EMPRESA==1 ? ' ACTIVO' : ' INACTIVO'}}</span></div>
        </div>
      </div>
    </div>
    <div class="ml-24 mt-2">
      <icon icon="fa-pen-to-square" class="text-blue-800 text-3xl" @click="empresaStore.open(empresaStore.oneempresa, 2)" />
      <icon icon="fa-trash" class="text-red-500 text-3xl ml-4" @click="empresaStore.open(empresaStore.oneempresa, 3)" />
    </div>
    <div class="w-full h-8 mt-8">
      <simpleTabs :tabs="empresaStore.tabs">
        <template #tab-0>
          <datatable :data="empresaStore.peliculas" :headers="empresaStore.headerspeliculas">
            <template #ESTADO="{ item }">
              <div class="border rounded-full text-white" :class="[item.ID_VISTO ? 'bg-green-400' : 'bg-red-400']">{{
                item.ID_VISTO ? 'Visto' :
                'Sin ver' }}</div>
            </template>
            <template #actions="{ item }">
              <icon icon="pen-to-square" @click="empresaStore.open(item, 2)"
                class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
              <icon icon="trash" @click="empresaStore.open(item, 3)" class="text-3xl text-red-500 hover:scale-125" />
            </template>
          </datatable>
        </template>
      </simpleTabs>
    </div>
  </div>
  <EditEmpresa />
  <CrearEmpresa />
  <DeleteEmpresa />
</template>
