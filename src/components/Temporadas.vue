<template>
    <div>
      <div class="flex mb-4 bg-blue-500 rounded-tl-3xl rounded-tr-3xl">
        <button @click="prevPage" v-if="totalPages > 1" :disabled="currentPage === 0" class="px-3 py-1 mr-2 bg-blue-500 rounded-md cursor-pointer focus:outline-none">
          <icon icon="fa-solid fa-angles-left" class="text-white"/>
        </button>
        <button
          v-for="(tab, index) in visibleTabs"
          :key="index"
          @click="activeTab = tab,console.log(tab);"
          :class="{ 'bg-blue-800 underline font-bold': activeTab === tab }"
          class="text-white py-2 px-4 rounded-l-md hover:bg-blue-800 hover:underline hover:font-bold"
        >
          {{ tab.nombre }}
        </button>
        <button @click="nextPage" v-if="totalPages > 1" :disabled="currentPage === totalPages - 1" class="px-3 py-1 bg-blue-500 rounded-md cursor-pointer focus:outline-none ml-auto">
          <icon icon="fa-solid fa-angles-right" class="text-white"/>
        </button>
      </div>
      <!-- Tab Content -->
      <div v-if="activeTab">
        <h3 class="text-lg font-semibold mb-2">{{ activeTab.name }}</h3>
        <datatable :data="activeTab.episodios" :headers="store.headers_temporada" :loading="store.loading_temporada">
          <template #visualizacion="{ item}">
            <span class="p-2 rounded-2xl text-white" :class="[item.visualizacion == 'S' ? 'bg-green-500' : 'bg-red-500']">{{ item.visualizacion == 'S' ? 'VISTO' : 'NO VISTO' }}</span>
        </template>
        <template #calificacion="{ item }">
          <rating :initialRating="parseInt(item.calificacion)" />{{ item.calificacion }}
        </template>
        <template #imagen="{ item }">
            <div class="mx-auto w-48">
                <router-link :to="{ name: 'seriedetalle', params: { id: item.id_serie } }">
                    <img :src="item.imagen" :alt="item.nombre" class="h-40">
                </router-link>
            </div>
        </template>
        <template #actions="{ item }">
            <icon icon="pen-to-square" @click="store.open(item, 1)"
                class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
            <icon icon="trash" @click="store.open(item, 2)" 
            class="text-3xl text-red-500 hover:scale-125" />
        </template>
        </datatable>
      </div>
    </div>
  </template>

  <script setup>
import { ref, computed,  onMounted, onBeforeUnmount } from 'vue';
import { useSerieStore } from '@/stores/serie';
const store = useSerieStore();

const itemsPerPage = ref(8);
const currentPage = ref(0);

const visibleTabs = computed(() => {
  const startIndex = currentPage.value * itemsPerPage.value;
  return store.temporadas.slice(startIndex, startIndex + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(store.temporadas.length / itemsPerPage.value));
const activeTab = ref(visibleTabs.value[0]); // Tab activa
function prevPage() {
  currentPage.value--;
}

function nextPage() {
  currentPage.value++;
}
function updateItemsPerPage() {
  if (window.innerWidth < 768) {
    itemsPerPage.value = 1;
  } else {
    itemsPerPage.value = 8;
  }
}

onMounted(() => {
  updateItemsPerPage();
  window.addEventListener('resize', updateItemsPerPage);
  store.getTemporadaEpisodio();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsPerPage);
});
  </script>

<style lang="css" scoped>

</style>