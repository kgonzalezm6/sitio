<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useActrizStore } from '../stores/actriz';
import { useRoute, onBeforeRouteLeave } from "vue-router"
const route = useRoute();
const store = useActrizStore();

onMounted(() => {
  store.id = route.params.id
  store.getActrizSerie();
});

onBeforeRouteLeave((to, from, next) => {
  // Realiza acciones antes de abandonar la ruta
  // store.oneactriz = [];
  // store.actrices = [];

  // Llama a next() para continuar con la transición de la ruta
  next();
});

</script>

<template>
  {{ store.series }}
   <div>
    <span class="font-bold text-3xl ml-20 mb-10 text-teal-700">{{store.oneactriz.nombre}}</span>
    <div class="grid gap-2 md:grid-cols-12 mt-8">
      <div class="col-span-12 md:col-span-4 rounded-lg ml-9 border-solid 
                border-[0.375rem] border-white
                 flex items-center justify-center">
        <img :src="store.oneactriz.foto" :alt="store.oneactriz.nombre" class="h-[20rem]">
      </div>

      <div class="col-span-12 md:col-span-8">
        <div class="grid grid-cols-6 text-[10pt]">
          <!-- <span class="col-span-6 p-4 md:col-span-2"> <span class="font-bold">ETNIA: </span> {{ store.oneactriz.etnia.nombre}}</span> -->
           <!-- <span class="col-span-6 p-4 md:col-span-1"> <span class="font-bold">ALTURA: </span> {{ store.oneactriz.altura + ' cm' }}</span> -->
           <div class="col-span-3">
            <img :src="store.oneactriz.busto" :alt="store.oneactriz.nombre" class="h-[20rem]" srcset="">
           </div>
           <div class="col-span-3">
            <img :src="store.oneactriz.gluteo" :alt="store.oneactriz.nombre" class="h-[20rem]">
           </div>
          
          <!-- <span class="col-span-6 p-4 md:col-span-2"> <span class="font-bold">NACIONALIDAD: </span> {{
            store.oneactriz.nacionalidad.nombre }}</span> -->
            <!--
          <span class="col-span-6 p-4 md:col-span-1"> <span class="font-bold">PESO: </span> {{ store.oneactriz.PESO_CHICA }}
            lb</span>
          <span class="col-span-6 p-4 md:col-span-3"> <span class="font-bold">PIERCINGS: </span> {{ store.oneactriz.PIERCING_CHICA
          }}</span>
          <span class="col-span-6 md:col-span-2 p-4"> <span class="font-bold">CABELLO: </span> {{
            store.oneactriz.cabello.NOMBRE_CABELLO }}</span>
          <span class="col-span-6 md:col-span-1 p-4"> <span class="font-bold">MEDIDAS: </span> {{ store.oneactriz.MEDIDAS_CHICA
          }}</span>

          <div class="col-span-6 md:col-span-3 p-4"><span class="font-bold">ESTADO: </span><span
              :class="{ 'text-green-500 font-bold': store.oneactriz.ESTADO_CHICA == 1, 'text-red-500 font-bold': store.oneactriz.ESTADO_CHICA == 0 }">
              {{ store.oneactriz.ESTADO_CHICA == 1 ? ' ACTIVO' : ' INACTIVO' }}</span></div> -->
        </div>
      </div>
    </div>
    <div class="grid gap-2 md:grid-cols-12 mt-5">
      <div class="col-span-12 md:col-span-4 flex justify-center items-center">
        <!-- <icon icon="fa-pen-to-square" class="text-blue-800 text-3xl" @click="store.open(store.oneactriz, 1)" />
        <icon icon="fa-trash" class="text-red-500 text-3xl ml-4" @click="store.open(store.onechica, 2)" /> -->
      </div>
    </div>

    <div class="grid gap-2 grid-cols-12 mt-8">
      <div class="col-span-12 md:col-span-3">
        <div class="grid gap-2">
            <span class="font-bold">Fecha de nacimiento</span>
            <span>{{ store.oneactriz.fechanac}}</span>
            <span class="font-bold">Astrologia</span>
            <!-- <span>{{ store.oneactriz.astrologia.NOMBRE_ASTROLOGIA}}</span> -->
            <span class="font-bold">Lugar de nacimiento</span>
            <!-- <span>{{ store.oneactriz.lugarnac.nombre}}</span> -->
            <span class="font-bold">Redes Sociales</span>
            <div class="ml-10">
              <a :href="store.oneactriz.instagram" target="_blank" rel="noopener noreferrer"> 
                <icon icon="fa-brands fa-instagram" class="text-rose-400"/>
              </a>
              <a :href="store.oneactriz.twitter" target="_blank" rel="noopener noreferrer" class="ml-3"> 
                <icon icon="fa-brands fa-twitter" class="text-sky-500"/>
              </a>
            </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-9">
        <simpleTabs :tabs="store.tab">
          <template #tab-0>
            <datatable :data="store.series" :headers="store.headers_series">
              <template #imagen="{ item }">
                <img :src="item.serie.imagen" :alt="item.serie.nombre" srcset="" class="h-40">
              </template>
              <template #estado="{ item }">
                <div class="border rounded-full text-white"
                  :class="[item.serie.estado ? 'bg-green-400' : 'bg-red-400']">{{ item.serie.estado ? 'Activo' :
                    'Inactivo' }}</div>
              </template>
              <template #actions="{ item }">

                <icon icon="pen-to-square"
                  class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                <icon icon="trash" class="text-3xl text-red-500 hover:scale-125" />
              </template>
            </datatable>
          </template>
          <template #tab-1>
            <!-- <div class="grid grid-cols-12 gap-3">
                <div class="col-span-6 bg-white h-72 rounded-2xl flex justify-center items-center">
                  <apexchart class="w-full" type="bar" :options="store.optionsTipo" :series="store.seriesTipo"  v-if="store.datosListos"/>
                  
                </div>
                <div class="col-span-6 bg-white h-72 rounded-2xl">
                  <apexchart class="w-full" type="bar" :options="store.optionsEmpresa" :series="store.seriesEmpresa"  v-if="store.datosListos"/>
                </div>
                <div class="col-span-6 bg-white h-72 rounded-2xl">
                  <apexchart class="w-full" type="bar" :options="store.optionsFecha" :series="store.seriesFecha"  v-if="store.datosListos"/>
                </div>
                <div class="col-span-6 bg-white h-72 rounded-2xl">

                </div>
            </div> -->
          </template>
        </simpleTabs>
      </div>

    </div>
</div> 
</template>
