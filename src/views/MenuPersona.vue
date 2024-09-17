<template>
    <div>
        <div>
            <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
            <div class="bg-white w-full shadow-all grid grid-cols-2 md:grid-cols-6 gap-5 p-2">
                <router-link :to="{name : 'Chicas'}" class="w-full bg-rose-300 rounded-lg h-[3.5rem] flex"> 
                    <div class="truncate w-[70%]">Chicas</div> 
                    <div class="text-4xl ml-auto mr-2">1</div> 
                </router-link>
                <router-link :to="{name : 'Peliculas'}" class="w-full bg-rose-300 rounded-lg h-[3.5rem] flex"> 
                    <div class="truncate w-[70%]">Peliculas</div> 
                    <span class="text-4xl ml-auto mr-2">1</span> 
                </router-link>
                <router-link :to="{name : 'Empresas'}" class="w-full bg-rose-300 rounded-lg flex"> 
                    <div class="truncate w-[70%]">Empresas</div> 
                    <span class="text-4xl ml-auto mr-2">1</span> 
                </router-link>
                <div class="w-full bg-rose-300 rounded-lg  flex"> 
                    <div class="truncate w-[70%]">Actrices</div>
                    <span class="text-4xl ml-auto mr-2">1</span>
                 </div>
                <div class="w-full bg-rose-300 rounded-lg  flex"> 
                    <div class="truncate w-[70%] h-[3.5rem]">Series</div>
                    <span class="text-4xl ml-auto mr-2">1</span>
                 </div>
                <div class="w-full bg-rose-300 rounded-lg flex"> 
                    <div class="truncate w-[70%] h-[3.5rem]">Mantenimiento</div> 
                    <span class="text-4xl ml-auto mr-2"></span>
                </div>
            </div>
            <div class="bg-white w-full shadow-all grid md:grid-cols-2 gap-5 my-10 p-8">
                <div class="w-full h-[15rem] bg-rose-600">  </div>
                <div class="w-full h-[15rem] bg-rose-600">  </div>
                <div class="w-full h-[15rem] bg-rose-600">  </div>
                <div class="w-full h-[15rem] bg-rose-600">  </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { onBeforeMount,ref, onMounted } from 'vue';
import { useGeneralStore } from '../stores/general.js'
import { useestadisticasStore } from '../stores/estadisticas';
const generalStore = useGeneralStore();
const estadisticasStore = useestadisticasStore();
const breadcrumbs = [
  { name: 'Home', path: '/', icon: 'fas fa-home' },
  { name: 'Persona', path: '' }
];
onBeforeMount(() => {

});
onMounted(() => {
  console.log('Persona montado');
});
</script>