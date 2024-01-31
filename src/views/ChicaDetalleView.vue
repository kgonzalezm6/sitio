<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useChicaStore } from '../stores/chica';
import { useRoute, onBeforeRouteLeave } from "vue-router"
const route = useRoute();
const chicaStore = useChicaStore();
const isValid = ref(false);
import EditPelicula from '../components/serie/EditPelicula.vue';
import EditChica from '../components/serie/EditChica.vue'
import CrearEmpresa from '../components/serie/CrearEmpresa.vue';
import DeleteEmpresa from '../components/serie/DeleteEmpresa.vue'
onBeforeMount(() => {
  chicaStore.id = route.params.id
  chicaStore.getOneChica();
});

onBeforeRouteLeave((to, from, next) => {
  // Realiza acciones antes de abandonar la ruta
  chicaStore.onechica = [];
  chicaStore.chicas = [];
  chicaStore.datosListos = false;

  // Llama a next() para continuar con la transición de la ruta
  next();
});

const series = [{
        name: 'series-1',
        data: []
      }];
</script>

<template>
  <!-- {{ chicaStore.unachica }} -->
  <div v-if="chicaStore.datosListos">
    <span class="font-bold text-3xl ml-20 mb-10 text-teal-700">{{ chicaStore.unachica.NOMBRE_CHICA }}</span>
    <div class="grid gap-2 md:grid-cols-12 mt-8">
      <div class="col-span-12 md:col-span-4 rounded-lg ml-9 border-solid 
                border-[0.375rem] border-white
                bg-gray-700 flex items-center justify-center">
        <img :src="chicaStore.unachica.FOTO_CHICA" :alt="chicaStore.unachica.NOMBRE_CHICA" class="h-[20rem]">
      </div>
      <div class="col-span-12 md:col-span-8">
        <div class="grid grid-cols-6 text-[10pt]">
          <span class="col-span-6 p-4 md:col-span-2"> <span class="font-bold">ETNIA: </span> {{ chicaStore.unachica.etnia.NOMBRE_ETNIA
          }}</span>
          <span class="col-span-6 p-4 md:col-span-1"> <span class="font-bold">ALTURA: </span> {{ chicaStore.unachica.ALTURA_CHICA }}</span>
          <span class="col-span-6 p-4 md:col-span-3"> <span class="font-bold ">TATUAJES: </span> {{ chicaStore.unachica.TATUAJES_CHICA
          }}</span>
          <span class="col-span-6 p-4 md:col-span-2"> <span class="font-bold">NACIONALIDAD: </span> {{
            chicaStore.unachica.nacionalidad.NOMBRE_NACIONALIDAD }}</span>
          <span class="col-span-6 p-4 md:col-span-1"> <span class="font-bold">PESO: </span> {{ chicaStore.unachica.PESO_CHICA }}
            lb</span>
          <span class="col-span-6 p-4 md:col-span-3"> <span class="font-bold">PIERCINGS: </span> {{ chicaStore.unachica.PIERCING_CHICA
          }}</span>
          <span class="col-span-6 md:col-span-2 p-4"> <span class="font-bold">CABELLO: </span> {{
            chicaStore.unachica.cabello.NOMBRE_CABELLO }}</span>
          <span class="col-span-6 md:col-span-1 p-4"> <span class="font-bold">MEDIDAS: </span> {{ chicaStore.unachica.MEDIDAS_CHICA
          }}</span>

          <div class="col-span-6 md:col-span-3 p-4"><span class="font-bold">ESTADO: </span><span
              :class="{ 'text-green-500 font-bold': chicaStore.unachica.ESTADO_CHICA == 1, 'text-red-500 font-bold': chicaStore.unachica.ESTADO_CHICA == 0 }">
              {{ chicaStore.unachica.ESTADO_CHICA == 1 ? ' ACTIVO' : ' INACTIVO' }}</span></div>
        </div>
      </div>
    </div>
    <div class="grid gap-2 md:grid-cols-12 mt-5">
      <div class="col-span-12 md:col-span-4 flex justify-center items-center">
        <icon icon="fa-pen-to-square" class="text-blue-800 text-3xl" @click="chicaStore.open(chicaStore.unachica, 1)" />
        <icon icon="fa-trash" class="text-red-500 text-3xl ml-4" @click="chicaStore.open(chicaStore.onechica, 2)" />
      </div>
    </div>

    <div class="grid gap-2 grid-cols-12 mt-8">
      <div class="col-span-12 md:col-span-3">
        <div class="grid gap-2">
            <span class="font-bold">Alias</span>
            <span>{{ chicaStore.unachica.ALIAS_CHICA}}</span>
            <span class="font-bold">Fecha de nacimiento</span>
            <span>{{ chicaStore.unachica.FECHANAC_CHICA}}</span>
            <span class="font-bold">Astrologia</span>
            <span>{{ chicaStore.unachica.astrologia.NOMBRE_ASTROLOGIA}}</span>
            <span class="font-bold">Lugar de nacimiento</span>
            <span>{{ chicaStore.unachica.lugarnac.NOMBRE_LUGARNAC}}</span>
            <span class="font-bold">Años activo</span>
            <span>{{ chicaStore.unachica.fechacomienzo}}-{{ chicaStore.unachica.fechafin}}</span>
            <span class="font-bold">Redes Sociales</span>
            <div class="ml-10">
              <a :href="chicaStore.unachica.INSTAGRAM_CHICA" target="_blank" rel="noopener noreferrer"> 
                <icon icon="fa-brands fa-instagram" class="text-rose-400"/>
              </a>
              <a :href="chicaStore.unachica.TWITTER_CHICA" target="_blank" rel="noopener noreferrer" class="ml-3"> 
                <icon icon="fa-brands fa-twitter" class="text-sky-500"/>
              </a>
            </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-9">
        <simpleTabs :tabs="chicaStore.tabs">
          <template #tab-0>
            <datatable :data="chicaStore.peliculas" :headers="chicaStore.headerspeliculas">
              <template #NOMBRE_PELICULA="{ item }">
                <router-link :to="{ name: 'peliculadetalle', params: { id: item.ID_PELICULA } }">
                  <span>{{ item.NOMBRE_PELICULA }}</span>
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
          </template>
          <template #tab-1>
            <div class="grid grid-cols-12 gap-3">
                <div class="col-span-6 bg-white h-72 rounded-2xl flex justify-center items-center">
                  <apexchart class="w-full" type="bar" :options="chicaStore.optionsTipo" :series="chicaStore.seriesTipo"  v-if="chicaStore.datosListos"/>
                  
                </div>
                <div class="col-span-6 bg-white h-72 rounded-2xl">
                  <apexchart class="w-full" type="bar" :options="chicaStore.optionsEmpresa" :series="chicaStore.seriesEmpresa"  v-if="chicaStore.datosListos"/>
                </div>
                <div class="col-span-6 bg-white h-72 rounded-2xl">
                  <apexchart class="w-full" type="bar" :options="chicaStore.optionsFecha" :series="chicaStore.seriesFecha"  v-if="chicaStore.datosListos"/>
                </div>
                <div class="col-span-6 bg-white h-72 rounded-2xl">

                </div>
            </div>
          </template>
        </simpleTabs>
      </div>

    </div>
</div>
<EditPelicula />
<CrearEmpresa />
<DeleteEmpresa />
<EditChica />
</template>
