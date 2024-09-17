<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useActrizStore } from '../stores/actriz';
import { useRoute, onBeforeRouteLeave } from "vue-router"
import UpdateActriz from "@/components/serie/UpdateActriz.vue";
import UnionActriz from "@/components/serie/UnionActriz.vue";
const route = useRoute();
const store = useActrizStore();

onMounted(() => {
  const id = route.params.id;
      if (id) {
        store.id = id;
        store.getActrizSerie();
      } else {
        console.error('ID parameter is missing');
      }
});
onBeforeRouteLeave((to, from) => {
  store.series = [];
  store.tabla = [];
});

</script>

<template>
   <div v-if="store.loading_series">
        <UpdateActriz />
        <UnionActriz />
        <div>
          <router-link :to="{ name: 'MenuPersona'}"
            class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
            active-class="border-indigo-500 text-gray-900 focus:border-indigo-700"
            inactive-class="text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
            >Home</router-link>
            <Icon icon="chevron-right" class="text-sky-400"/>
            <router-link :to="{ name: 'Actrices'}"
            class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
            active-class="border-indigo-500 text-gray-900 focus:border-indigo-700"
            inactive-class="text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
            >Actrices</router-link>
            <Icon icon="chevron-right" class="text-sky-400"/>
            <span
            class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
            active-class="border-indigo-500 text-gray-900 focus:border-indigo-700"
            inactive-class="text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
            >Detalle</span>
        </div>
        <div class="grid grid-cols-6 md:grid-cols-12 gap-2" v-if="store.series[0]">
          <div class="col-span-12 md:col-span-4 rounded-lg mt-8">
            <div class="font-bold text-4xl mb-10 text-teal-700 text-center">{{store.series[0].nombre}}</div>
            <div class="flex justify-center">
              <img class="h-[15rem] border-solid border-[0.375rem] border-white shadow-xl" :src="store.series[0].foto" :alt="store.series[0].nombre">
            </div>
            <div class="flex justify-center mt-3 gap-1">
              <Icon icon="fa-link" class="text-orange-500 text-3xl" @click="store.opcion_union = true, store.union.actriz_id = store.id" />
              <Icon icon="fa-pen-to-square" class="text-blue-800 text-3xl ml-4" @click="store.open(store.series[0], 1)" />
              <Icon icon="fa-trash" class="text-red-500 text-3xl ml-4" @click="store.open(store.series[0], 2)" />
            </div>
          </div>
          <div class="col-span-12 md:col-span-8 flex items-center justify-center">
            <div class="grid grid-cols-6 gap-2">
              <div class="col-span-3 ">
                <img :src="store.series[0].busto" :alt="store.series[0].nombre" class="h-[10rem]">
              </div>
              <div class="col-span-3 ">
                <img :src="store.series[0].gluteo" :alt="store.series[0].nombre" class="h-[10rem]">
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-6 md:grid-cols-12 gap-2 mt-8" v-if="store.series[0]">
          <div class="col-span-12 md:col-span-4 rounded-lg">
            <div class="grid gap-2 text-center">
                <span class="font-bold">Fecha de nacimiento</span>
                <span>{{ store.series[0].fecha}}</span>
                <span class="font-bold">Astrologia</span>
                <span>{{ store.series[0].nastrologia}}</span>
                <span class="font-bold">Lugar de nacimiento</span>
                <span>{{ store.series[0].nlugarnac}}</span>
                <span class="font-bold">Etnia</span>
                <span>{{ store.series[0].netnia}}</span>
                <span class="font-bold">Nacionalidad</span>
                <span>{{ store.series[0].nnacionalidad}}</span>
                <span class="font-bold">Cabello</span>
                <span>{{ store.series[0].ncabello}}</span>
                <span class="font-bold">Redes Sociales</span>
                <div class="ml-10">
                  <a :href="store.series[0].instagram" target="_blank" rel="noopener noreferrer"> 
                    <Icon icon="fa-brands fa-instagram" class="text-rose-400"/>
                  </a>
                  <a :href="store.series[0].twitter" target="_blank" rel="noopener noreferrer" class="ml-3"> 
                    <Icon icon="fa-brands fa-twitter" class="text-sky-500"/>
                  </a>
                </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-8 flex items-center justify-center">
                <datatable :data="store.tabla" :headers="store.headers_series">
                  <template #imagen="{ item }">
                    <img :src="item.imagen" :alt="item.nombre" srcset="" class="h-40">
                  </template>
                  <template #estado="{ item }">
                    <div class="border rounded-full text-white"
                      :class="[item.estado ? 'bg-green-400' : 'bg-red-400']">{{ item.estado ? 'Activo' :
                        'Inactivo' }}</div>
                  </template>
                  <template #actions="{ item }">

                    <Icon icon="pen-to-square"
                      class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                    <Icon icon="trash" class="text-3xl text-red-500 hover:scale-125" />
                  </template>
                </datatable>
              
          </div>
        </div>
  </div> 
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75" v-else>
    <div class="loader"></div>
  </div>
</template>
<style>
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
