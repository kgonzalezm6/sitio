<template>
    <div v-if="store.loading_registro">
      <div class="w-full bg-white rounded-xl h-auto md:h-[18rem] shadow-all md:flex justify-start items-center">
        <div class="w-full md:w-[40%]">
            <img :src="imageUrl(store.registro.imagen)" :alt="store.registro.nombre" class="h-[3rem] mx-auto md:ml-10 mt-10 md:mt-0 hover:cursor-pointer">
        </div>
        <div class="bg-white h-full w-full md:w-[60%] px-5 md:px-[10rem]">
            <div class="py-12 font-extrabold text-blue-900">
                NOMBRE :
                <span class="font-light">{{store.registro.nombre}}</span>
            </div>
            <div class="py-12 font-extrabold text-blue-900">
                SITIO :
                <a :href="store.registro.sitio" class="font-light text-black">{{store.registro.nombre}}</a>
            </div>
        </div>
    </div>
        <div class="w-full bg-white rounded-xl h-[25rem] shadow-all mt-7">
            <datatable :data="store.registro.peliculas" :headers="pelicula.headers" :loading="store.loading_registro">

                <template #estado="{ item }">
                    <span class="border rounded-full text-white text-center w-36 px-2 py-1"
                        :class="[item.estado == 'ACTIVO' ? 'bg-green-400' : 'bg-red-400']">{{ item.estado }}</span>
                </template>
                <template #actions="{ item }">
                    <Icon icon="pen-to-square" @click="pelicula.opciones(2,item)"
                        class="text-3xl text-cyan-500 hover:scale-110 mr-2  cursor-pointer" />
                    <Icon icon="trash" @click="pelicula.opciones(3, item)" 
                    class="text-3xl text-red-500 hover:scale-110 cursor-pointer" />
                </template> 
            </datatable>
        </div>
    </div>
    <div v-else>
        <Loading />
    </div>

    <NuevoPelicula />
    <EditarPelicula />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import NuevoPelicula from '@/components/modals/NuevoPelicula.vue';
import EditarPelicula from '@/components/modals/EditarPelicula.vue';
import { useEmpresaStore } from '@/stores/empresa';
import { usePeliculaStore } from '@/stores/pelicula';
const store = useEmpresaStore();
const pelicula = usePeliculaStore();
const route = useRoute();

const imageUrl = (imagen) => `${import.meta.env.VITE_MY_URL_IMAGE}${imagen}`;

onMounted(() => {
    store.id = route.params.id;
    store.show();
});
</script>

<style scoped>
.envelope {
    position: relative;
    width: 120px;
    height: 80px;
    margin: 50px auto;
    background: #f5f5f5;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    perspective: 1000px;
  }
  .checkmark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
  }
  
  .checkmark-circle {
    width: 24px;
    height: 24px;
    border: 2px solid #4caf50;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .checkmark-stem {
    position: absolute;
    top: 8px;
    left: 6px;
    width: 6px;
    height: 16px;
    background: #4caf50;
    transform: rotate(45deg);
    transform-origin: left bottom;
  }
  
  .checkmark-kick {
    position: absolute;
    top: 14px;
    left: 8px;
    width: 16px;
    height: 6px;
    background: #4caf50;
    transform: rotate(-45deg);
    transform-origin: left bottom;
  }
  
  .flap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: #f5f5f5;
    border-bottom: 2px solid #d3d3d3;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    transform-origin: bottom;
    transform: rotateX(0deg);
    animation: flap 4s infinite ease-in-out;
  }
  
  .body {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 40%;
    background: #f0f0f0;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    z-index: 1;
  }
  
  @keyframes flap {
    0%, 100% {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(180deg);
    }
  }
  
</style>