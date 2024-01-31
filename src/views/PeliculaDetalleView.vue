<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { usePeliculaStore } from '../stores/pelicula';
import { useRoute, onBeforeRouteLeave } from "vue-router"
const route = useRoute();
const peliculaStore = usePeliculaStore();
const isValid = ref(false);
import EditEmpresa from '../components/serie/EditEmpresa.vue';
import CrearEmpresa from '../components/serie/CrearEmpresa.vue';
import DeleteEmpresa from '../components/serie/DeleteEmpresa.vue'
onBeforeMount(() => {
  peliculaStore.id = route.params.id
  peliculaStore.getOnePelicula();
  peliculaStore.getPeliculaChica();
});
onMounted(() => {

});

onBeforeRouteLeave((to, from, next) => {
  // Realiza acciones antes de abandonar la ruta
  peliculaStore.onepelicula = [];
  peliculaStore.chicas = [];
  peliculaStore.datosListos = false;

  // Llama a next() para continuar con la transición de la ruta
  next();
});
</script>

<template>
  <div v-if="peliculaStore.datosListos">
    <div class="grid gap-2 md:grid-cols-12 sm:grid-cols-4 mt-16">
      <div class="col-span-4 h-[12rem] w-[17.5rem] rounded-lg ml-9 border-solid 
                border-[0.375rem] border-white
                bg-gray-700 flex items-center justify-center">
        <!-- <img :src="peliculaStore.onepelicula.FOTO_PELICULA" :alt="peliculaStore.onepelicula.NOMBRE_PELICULA"> -->
      </div>
      <div class="col-span-8">
        <div class="grid grid-cols-4">
          <span class="col-span-2 p-4"> <span class="font-bold">NOMBRE: </span> {{ peliculaStore.onepelicula.NOMBRE_PELICULA }}</span>
          <span class="col-span-2 p-4"><span class="font-bold">NOMBRE DISTRIBUIDORA: </span> 
              {{ peliculaStore.onepelicula.empresa.NOMBRE_EMPRESA }} </span>
         <span class="col-span-2 p-4"><span class="font-bold">TIPO: </span> 
              {{ peliculaStore.onepelicula.tipo.NOMBRE_TIPO_PELICULA }} </span>
          <div class="col-span-2 p-4"><span class="font-bold">ESTADO: </span><span 
            :class="{'text-green-500 font-bold' : peliculaStore.onepelicula.ESTADO_PELICULA==1, 'text-red-500 font-bold': peliculaStore.onepelicula.ESTADO_PELICULA==0 }">
            {{peliculaStore.onepelicula.ESTADO_PELICULA==1 ? ' ACTIVO' : ' INACTIVO'}}</span></div>
          <span class="col-span-2 p-4"><span class="font-bold">FECHA: </span> 
            {{ peliculaStore.onepelicula.FECHA_PELICULA }} </span>
          <div class="col-span-2 p-4"><span class="font-bold">VISTO: </span><span 
              :class="{'text-green-500 font-bold' : peliculaStore.onepelicula.ID_VISTO, 'text-red-500 font-bold': peliculaStore.onepelicula.ESTADO_PELICULA==0 }">
              {{peliculaStore.onepelicula.ID_VISTO ? ' VISTO' : ' SIN VER'}}</span></div>
        </div>
      </div>
    </div>
    <div class="ml-24 mt-2">
      <icon icon="fa-pen-to-square" class="text-blue-800 text-3xl" @click="peliculaStore.open(peliculaStore.onepelicula, 2)" />
      <icon icon="fa-trash" class="text-red-500 text-3xl ml-4" @click="peliculaStore.open(peliculaStore.onepelicula, 3)" />
    </div>
    <div class="w-full h-8 mt-8">
      <simpleTabs :tabs="peliculaStore.tabs">
        <template #tab-0>
          <datatable :data="peliculaStore.chicas" :headers="peliculaStore.headerschicas">
            <template #FOTO_CHICA="{ item }">
                <img :src="item.FOTO_CHICA" :alt="item.NOMBRE_CHICA" srcset="" class="h-32">
            </template>
            <template #ESTADO_CHICA="{ item }">
              <div class="border rounded-full text-white p-2"
                  :class="[item.ESTADO_CHICA ? 'bg-green-400' : 'bg-red-400']">{{ item.ESTADO_CHICA ? 'Activo' :
                      'Inactivo' }}</div>
          </template>
            <template #actions="{ item }">
              <icon icon="pen-to-square" @click="peliculaStore.open(item, 2)"
                class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
              <icon icon="trash" @click="peliculaStore.open(item, 3)" class="text-3xl text-red-500 hover:scale-125" />
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
