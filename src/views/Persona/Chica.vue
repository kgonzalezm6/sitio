<script setup>
import { ref, onMounted } from 'vue';
import { useChicaStore } from '@/stores/chica';
import { useRoute, onBeforeRouteLeave } from "vue-router"
const route = useRoute();
const store = useChicaStore();
const breadcrumbs = [
  { name: 'Home', path: '/', icon: 'fas fa-home' },
  { name: 'Persona', path: '/persona'},
  { name: 'Chicas', path: '/persona/chicas' },
  { name: 'Detalle', path: '' }, // Página actual
];
onMounted(() => {
  store.id = route.params.id;
  store.getOne();
});

onBeforeRouteLeave((to, from, next) => {
  store.chica = [];
  next();
});
</script>

<template>
  <div v-if="store.loading_chica">
    <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
    <div>
      <span class="font-bold text-3xl ml-20 mb-10 text-teal-700">{{ store.chica.nombre }}</span>
      <div class="grid gap-2 md:grid-cols-12 mt-8">
        <div class="col-span-12 md:col-span-4 rounded-lg ml-9 border-solid 
                  border-[0.375rem] border-white
                  bg-gray-700 flex items-center justify-center">
          <img :src="store.chica.foto" :alt="store.chica.nombre" class="h-[20rem]">
        </div>
        <div class="col-span-12 md:col-span-8">
          <div class="grid grid-cols-6 text-[10pt]">
            <span class="col-span-6 p-4 md:col-span-2"> <span class="font-bold">ETNIA: </span> {{ store.chica.etnia
            }}</span>
            <span class="col-span-6 p-4 md:col-span-1"> <span class="font-bold">ALTURA: </span> {{ store.chica.altura + ' CM' }}</span>
            <span class="col-span-6 p-4 md:col-span-3"> <span class="font-bold ">TATUAJES: </span> {{ store.chica.tatuajes
            }}</span>
            <span class="col-span-6 p-4 md:col-span-2"> <span class="font-bold">NACIONALIDAD: </span> {{
              store.chica.nacionalidad }}</span>
            <span class="col-span-6 p-4 md:col-span-1"> <span class="font-bold">PESO: </span> {{ store.chica.peso }}
              LB</span>
            <span class="col-span-6 p-4 md:col-span-3"> <span class="font-bold">PIERCINGS: </span> {{ store.chica.piercing
            }}</span>
            <span class="col-span-6 md:col-span-2 p-4"> <span class="font-bold">CABELLO: </span> {{
              store.chica.cabello }}</span>
            <span class="col-span-6 md:col-span-1 p-4"> <span class="font-bold">MEDIDAS: </span> {{ store.chica.medidas
            }}</span>
  
          </div>
        </div>
      </div>
      <div class="grid gap-2 md:grid-cols-12 mt-5">
        <div class="col-span-12 md:col-span-4 flex justify-center items-center">
          <Icon icon="fa-pen-to-square" class="text-blue-800 text-3xl" @click="store.open(store.chica, 1)" />
          <Icon icon="fa-trash" class="text-red-500 text-3xl ml-4" @click="store.open(store.chica, 2)" />
        </div>
      </div>
  
      <div class="grid gap-2 grid-cols-12 mt-8">
        <div class="col-span-12 md:col-span-3">
          <div class="grid gap-2">
              <span class="font-bold">Alias</span>
              <span>{{ store.chica.alias}}</span>
              <span class="font-bold">Fecha de nacimiento</span>
              <span>{{ store.chica.fechanac}}</span>
              <span class="font-bold">Astrologia</span>
              <span>{{ store.chica.astrologia}}</span>
              <span class="font-bold">Lugar de nacimiento</span>
              <span>{{ store.chica.lugarnac}}</span>
              <span class="font-bold">Años activo</span>
              <span>{{ store.chica.comienzo+'-'+store.chica.fin}}</span>
              <span class="font-bold">Estado</span>
              <span :class="{ 'text-green-500 font-bold': store.chica.estado == 'ACTIVO', 'text-red-500 font-bold': store.chica.estado == 'INACTIVO' }">{{ store.chica.estado}}</span>
              <span class="font-bold">Redes Sociales</span>
              <div class="ml-10">
                <a :href="store.chica.instagram" target="_blank" rel="noopener noreferrer"> 
                  <Icon icon="fa-brands fa-instagram" class="text-rose-400"/>
                </a>
                <a :href="store.chica.twitter" target="_blank" rel="noopener noreferrer" class="ml-3"> 
                  <Icon icon="fa-brands fa-twitter" class="text-sky-500"/>
                </a>
              </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-9">
          <simple-tabs :tabs="store.tabs">
            <template #tab-0>
              
            </template>
            <template #tab-1>
             
            </template>
          </simple-tabs>
        </div>
  
      </div>
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
<!-- <EditPelicula />
<CrearEmpresa />
<DeleteEmpresa />
<EditChica /> -->
</template>
