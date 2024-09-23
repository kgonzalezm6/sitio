<template>
  <div v-if="store.loading_registro">
    <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
    <div>
      <span class="font-bold text-3xl ml-20 mb-10 text-teal-700">{{ store.registro.nombre }}</span>
      <div class="grid gap-2 md:grid-cols-12 mt-8">
        <div class="col-span-12 md:col-span-4 rounded-lg ml-9 border-solid 
                  border-[0.375rem] border-white
                  bg-gray-700 flex items-center justify-center">
          <img :src="imageUrl(store.registro.foto)" :alt="store.registro.nombre" class="h-[20rem]">
        </div>
        <div class="col-span-12 md:col-span-8">
          <div class="grid grid-cols-6 text-[10pt]">
            <span class="col-span-6 p-4 md:col-span-2"> <span class="font-bold">ETNIA: </span> {{ store.registro.etnia
            }}</span>
            <span class="col-span-6 p-4 md:col-span-1"> <span class="font-bold">ALTURA: </span> {{ store.registro.altura + ' CM' }}</span>
            <span class="col-span-6 p-4 md:col-span-3"> <span class="font-bold ">TATUAJES: </span> {{ store.registro.tatuajes
            }}</span>
            <span class="col-span-6 p-4 md:col-span-2"> <span class="font-bold">NACIONALIDAD: </span> {{
              store.registro.nacionalidad }}</span>
            <span class="col-span-6 p-4 md:col-span-1"> <span class="font-bold">PESO: </span> {{ store.registro.peso }}
              LB</span>
            <span class="col-span-6 p-4 md:col-span-3"> <span class="font-bold">PIERCINGS: </span> {{ store.registro.piercing
            }}</span>
            <span class="col-span-6 md:col-span-2 p-4"> <span class="font-bold">CABELLO: </span> {{
              store.registro.cabello }}</span>
            <span class="col-span-6 md:col-span-1 p-4"> <span class="font-bold">MEDIDAS: </span> {{ store.registro.medidas
            }}</span>
  
          </div>
        </div>
      </div>
      <div class="grid gap-2 md:grid-cols-12 mt-5">
        <div class="col-span-12 md:col-span-4 flex justify-center items-center">
          <Icon icon="fa-pen-to-square" class="text-blue-800 text-3xl" @click="store.open(store.registro, 1)" />
          <Icon icon="fa-trash" class="text-red-500 text-3xl ml-4" @click="store.open(store.registro, 2)" />
        </div>
      </div>
  
      <div class="grid gap-2 grid-cols-12 mt-8">
        <div class="col-span-12 md:col-span-3">
          <div class="grid gap-2">
              <span class="font-bold">Alias</span>
              <span>{{ store.registro.alias}}</span>
              <span class="font-bold">Fecha de nacimiento</span>
              <span>{{ store.registro.fechanac}}</span>
              <span class="font-bold">Astrologia</span>
              <span>{{ store.registro.astrologia}}</span>
              <span class="font-bold">Lugar de nacimiento</span>
              <span>{{ store.registro.lugarnac}}</span>
              <span class="font-bold">Años activo</span>
              <span>{{ store.registro.comienzo+'-'+store.registro.fin}}</span>
              <span class="font-bold">Estado</span>
              <span :class="{ 'text-green-500 font-bold': store.registro.estado == 'ACTIVO', 'text-red-500 font-bold': store.registro.estado == 'INACTIVO' }">{{ store.registro.estado}}</span>
              <span class="font-bold">Redes Sociales</span>
              <div class="ml-10">
                <a :href="store.registro.instagram" target="_blank" rel="noopener noreferrer"> 
                  <Icon icon="fa-brands fa-instagram" class="text-rose-400"/>
                </a>
                <a :href="store.registro.twitter" target="_blank" rel="noopener noreferrer" class="ml-3"> 
                  <Icon icon="fa-brands fa-twitter" class="text-sky-500"/>
                </a>
              </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-9">
          <simple-tabs :tabs="store.tabs">
            <template #tab-0>
              <datatable :data="store.registro.peliculas" :headers="pelicula.headers" :loading="store.loading_registro">
            </datatable>
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
<script setup>
import { ref, onMounted } from 'vue';
import { useChicaPeliculaStore } from '@/stores/chicapelicula';
import { usePeliculaStore } from '@/stores/pelicula';
import { useRoute, onBeforeRouteLeave } from 'vue-router'
const route = useRoute();
const store = useChicaPeliculaStore();
const pelicula = usePeliculaStore();

const imageUrl = (imagen) => `${import.meta.env.VITE_MY_URL_IMAGE}${imagen}`;
const name = store.registro.nombre;
const breadcrumbs = [
  { name: 'Home', path: '/', icon: 'fas fa-home' },
  { name: 'Persona', path: '/persona'},
  { name: 'Chicas', path: '/persona/chicas' },
  { name: name, path: '' }, // Página actual
];
onMounted(() => {
  store.id = route.params.id;
  store.show();
});

onBeforeRouteLeave((to, from, next) => {
  // store.registro = [];
  next();
});
</script>