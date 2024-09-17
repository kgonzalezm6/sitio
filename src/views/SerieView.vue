
<template>
  <div>
    <div class="flex w-36 bg-[#1355BF] h-16 rounded-br-full justify-center">
      <span class="font-monserrat font-extrabold text-[#EDBF18] text-xl">
        <Icon icon="fa-solid fa-film" class="mt-4 text-slate-200 text-2xl" />
        SERIES
      </span>
      <!-- #BF8713 -->
    </div>

    <simple-tabs :tabs="['Siguiendo', 'Pendiente', 'Finalizado']" class="mt-10">

      <template #tab-0>
        <!-- Contenido de la pestaña 1 -->
        <div class="flex">
          <div class="ml-10 mt-10 bg-white px-2">
            <label class="px-2">Genero: </label>
            <select class="h-8 focus:outline-none focus:border-blue-500">
              <option value="todos">Todos </option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">year: </label>
            <select v-model="selectedYear" class="h-8">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}</option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">Estado: </label>
            <select class="h-8">
              <option value="todos">Todos</option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">Orden: </label>
            <select class="h-8">
              <option value="todos">Todos</option>
            </select>
          </div>
          <div class="ml-10 mt-10 flex">
            <button type="button" class="bg-blue-800 text-white px-8 md:h-8 rounded-lg flex items-center">
              <Icon icon="fa-solid fa-filter" class="text-white" />
              <span class="hidden sm:block ml-2">Filtrar</span>
            </button>
          </div>

          <div class="ml-auto mt-10">
            <button type="button" class=" text-white px-8 md:h-8 sm:h-4
                  rounded-lg" @click="serieStore.isOpen = true">
              <Icon icon="fa-gear" class=" text-[#EDBF18] text-3xl" />
            </button>
          </div>
        </div>
        <div class="my-10 mx-16">
          <div class="bg-white flex items-center">
            <input type="search" v-model="busqueda" class="text-blue-700 h-8 flex-grow">
            <Icon icon="fa-solid fa-magnifying-glass" class="text-blue-800 transform rotate-90 pr-2 mt-2" />
          </div>
        </div>
        <div class="grid gap-5 xl:grid-cols-7 lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-2 ml-8 mt-16">
          <div class=" h-[15.5rem] w-[10.56rem] rounded-lg my-3 border-solid 
              border-[0.375rem] border-white" v-for="item in filteredDatos">
            <router-link :to="{ name: 'seriedetalle', params: { id: item.ID_SERIE } }">

              <img :src="item.IMAGEN_SERIE" :alt="item.NOMBRE_SERIE">
            </router-link>
          </div>
        </div>
      </template>
      <template #tab-1>
        <!-- Contenido de la pestaña 2 -->
        <div class="flex">
          <div class="ml-10 mt-10 bg-white px-2">
            <label class="px-2">Genero: </label>
            <select class="h-8 focus:outline-none focus:border-blue-500">
              <option value="todos">Todos </option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">year: </label>
            <select v-model="selectedYear" class="h-8">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}</option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">Estado: </label>
            <select class="h-8">
              <option value="todos">Todos</option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">Orden: </label>
            <select class="h-8">
              <option value="todos">Todos</option>
            </select>
          </div>
          <div class="ml-10 mt-10 flex">
            <button type="button" class="bg-blue-800 text-white px-8 md:h-8 rounded-lg flex items-center">
              <Icon icon="fa-solid fa-filter" class="text-white" />
              <span class="hidden sm:block ml-2">Filtrar</span>
            </button>
          </div>

          <div class="ml-auto mt-10">
            <button type="button" class=" text-white px-8 md:h-8 sm:h-4
                  rounded-lg" @click="serieStore.isOpen = true">
              <Icon icon="fa-gear" class=" text-[#EDBF18] text-3xl" />
            </button>
          </div>
        </div>
        <div class="my-10 mx-16">
          <div class="bg-white flex items-center">
            <input type="search" v-model="busqueda" class="text-blue-700 h-8 flex-grow">
            <Icon icon="fa-solid fa-magnifying-glass" class="text-blue-800 transform rotate-90 pr-2 mt-2" />
          </div>
        </div>
        <div class="grid gap-5 xl:grid-cols-7 lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-2 ml-8 mt-16">
          <div class=" h-[15.5rem] w-[10.56rem] rounded-lg my-3 border-solid 
              border-[0.375rem] border-white" v-for="item in filteredDatosP">
            <router-link :to="{ name: 'seriedetalle', params: { id: item.ID_SERIE } }">

              <img :src="item.IMAGEN_SERIE" :alt="item.NOMBRE_SERIE">
            </router-link>
          </div>
        </div>
      </template>
      <template #tab-2>
        <!-- Contenido de la pestaña 3 -->
        <div class="flex">
          <div class="ml-10 mt-10 bg-white px-2">
            <label class="px-2">Genero: </label>
            <select class="h-8 focus:outline-none focus:border-blue-500">
              <option value="todos">Todos </option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">year: </label>
            <select v-model="selectedYear" class="h-8">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}</option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">Estado: </label>
            <select class="h-8">
              <option value="todos">Todos</option>
            </select>
          </div>
          <div class="ml-10 mt-10 bg-white">
            <label class="px-2">Orden: </label>
            <select class="h-8">
              <option value="todos">Todos</option>
            </select>
          </div>
          <div class="ml-10 mt-10 flex">
            <button type="button" class="bg-blue-800 text-white px-8 md:h-8 rounded-lg flex items-center">
              <Icon icon="fa-solid fa-filter" class="text-white" />
              <span class="hidden sm:block ml-2">Filtrar</span>
            </button>
          </div>

          <div class="ml-auto mt-10">
            <button type="button" class=" text-white px-8 md:h-8 sm:h-4
                  rounded-lg" @click="serieStore.isOpen = true">
              <Icon icon="fa-gear" class=" text-[#EDBF18] text-3xl" />
            </button>
          </div>
        </div>
        <div class="my-10 mx-16">
          <div class="bg-white flex items-center">
            <input type="search" v-model="busqueda" class="text-blue-700 h-8 flex-grow">
            <Icon icon="fa-solid fa-magnifying-glass" class="text-blue-800 transform rotate-90 pr-2 mt-2" />
          </div>
        </div>
        <div class="grid gap-5 xl:grid-cols-7 lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-2 ml-8 mt-16">
          <div class=" h-[15.5rem] w-[10.56rem] rounded-lg my-3 border-solid 
              border-[0.375rem] border-white" v-for="item in filteredDatosF">
            <router-link :to="{ name: 'seriedetalle', params: { id: item.ID_SERIE } }">

              <img :src="item.IMAGEN_SERIE" :alt="item.NOMBRE_SERIE">
            </router-link>
          </div>
        </div>
      </template>
    </simple-tabs>


    <modal :open="serieStore.isOpen">
      <template #header>
        <Icon icon="fa-plus" class="text-[#ff9100]" /> Crear serie
      </template>
      <div class="flex flex-col w-96">
        <label for="" class="text-blue-800 ">Nombre: </label>
        <input type="text" class="h-8 mb-2" v-model="serieStore.serie.NOMBRE_SERIE">
        <label for="" class="text-blue-800 ">Fecha: </label>
        <input type="date" class="h-8 mb-2" v-model="serieStore.serie.FECHA_SERIE">
        <label for="" class="text-blue-800 ">Sitio: </label>
        <input type="url" class="h-8 mb-2" v-model="serieStore.serie.SITIO_SERIE">
        <label for="" class="text-blue-800 ">Estado: </label>
        <select class="h-8 mb-2 w-96 appearance-none border-2 
              border-white focus:outline-none focus:border-blue-500" v-model="serieStore.serie.ESTADO_SERIE">
          <option value="D" disabled class="text-gray-500">SELECCIONE UNA OPCION</option>
          <option value="P" class="text-blue-800">PROXIMAMENTE</option>
          <option value="E" class="text-green-500">EMISION</option>
          <option value="P" class="text-red-500">FINALIZADO</option>
        </select>
        <label for="" class="text-blue-800 ">Visualizacion: </label>
        <div class="relative bg-white h-8">
          <select class="h-8 mb-2 w-96 appearance-none border-2 
                  border-white focus:outline-none focus:border-blue-500"
            v-model="serieStore.serie.VISUALIZACION_SERIE">
            <option value="D" disabled class="text-gray-500 ml-6">SELECCIONE UNA OPCION</option>
            <option value="2" class="text-red-500 ml-6">POR VER</option>
            <option value="1" class="text-blue-800 ml-6">VIENDO</option>
            <option value="3" class="text-green-500 ml-6">FINALIZADO</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="fill-current text-blue-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L16 7z" />
            </svg>
          </div>
        </div>
        <label for="" class="text-blue-800 ">Foto: </label>
        <input type="url" id="imagenUrl" v-model="serieStore.serie.IMAGEN_SERIE" class="h-8 mb-2"
          :class="{ 'border-green-500': isValid }" @input="validateImageUrl">

        <div v-if="isValid" class="text-green-500 text-xs -mt-2">¡Enlace válido!</div>
        <div v-if="!isValid && serieStore.serie.IMAGEN_SERIE !== ''" class="text-red-500 text-xs -mt-2">Por favor,
          introduce un enlace de imagen válido.</div>

      </div>
      <template #footer>
        <button @click="serieStore.createSerie()" class="btn-dark shadow-neutral-900 text-green-500 mr-3"
          :disabled="!isValid">
          Guardar
        </button>
        <button @click="serieStore.isOpen = false" class="btn-dark shadow-neutral-900 text-red-500 ">
          Cerrar
        </button>
      </template>
    </modal>
    <!-- <alerta :message="alertMessage" :type="alertType" :show="alertShow" />
    <button @click="mostrarAlerta('success')">Mostrar Success</button>
    <button @click="mostrarAlerta('warning')">Mostrar Warning</button>
    <button @click="mostrarAlerta('danger')">Mostrar Danger</button>
    <button @click="toggleAlert">Toggle Alert</button> -->
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useSerieStore } from '../stores/serie';
const serieStore = useSerieStore();
const busqueda = ref('');
const isValid = ref(false);

const validateImageUrl = () => {
  const imgExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const isImage = imgExtensions.some(ext => serieStore.serie.IMAGEN_SERIE.toLowerCase().endsWith(ext));

  isValid.value = isImage;
};

const selectedYear = ref(new Date().getFullYear());
const years = ref([]);
function populateYears() {
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    years.value.push(currentYear - i);
  }
}
const filteredDatos = computed(() => {
  const lowerBusqueda = busqueda.value.toLowerCase();
  return serieStore.datossiguiendo.filter(item => item.NOMBRE_SERIE.toLowerCase().includes(lowerBusqueda));
});
const filteredDatosP = computed(() => {
  const lowerBusqueda = busqueda.value.toLowerCase();
  return serieStore.datospendiente.filter(item => item.NOMBRE_SERIE.toLowerCase().includes(lowerBusqueda));
});
const filteredDatosF = computed(() => {
  const lowerBusqueda = busqueda.value.toLowerCase();
  return serieStore.datosfinalizado.filter(item => item.NOMBRE_SERIE.toLowerCase().includes(lowerBusqueda));
});
const alertMessage = ref('');
const alertType = ref('');
const alertShow = ref(false);

const mostrarAlerta = (type) => {
  alertType.value = type;
  alertMessage.value = `¡Esto es una alerta de tipo ${type}!`;
  alertShow.value = true;
};

const toggleAlert = () => {
  alertShow.value = !alertShow.value;
};
onBeforeMount(() => {
  serieStore.getSerie();
  populateYears()
});
</script>
<style></style>