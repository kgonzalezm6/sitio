<template>
  <div>
    <div class="w-full rounded-lg">
        <div class="text-3xl text-white font-extrabold w-full bg-[#2ba8d5] pl-10">Mis Series</div>
        <div class="text-xs text-gray-400 font-semibold w-full bg-[#313234] h-10 flex items-center">
          <span class="pl-10"></span>
          <span 
            v-for="(tab, index) in tabs" 
            :key="index" 
            @click="activeTab = index"
            :class="[activeTab === index ? 'text-white bg-[#2ba8d5] rounded-sm' : '']"
            class=" px-2">
            {{ tab.name }}
          </span>
        </div>
        <div class="text-3xl text-white font-extrabold w-full bg-[#e8e8dc]">
          <div v-if="activeTab === 0">
            <div class="grid grid-cols-7 gap-1">
              <div v-for="i in series" class="p-10">
                <tooltip :message="i.nombre">
                  <img :src="i.imagen" alt="" srcset="" class="h-40">
                </tooltip>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 1">
            2
          </div>
        </div>
        <div class="text-3xl text-white font-extrabold w-full bg-[#d5d3be] h-32"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useSerieStore } from '@/stores/serie'
  const tabs = [
  {id:'1',name:'Para ver'},
  {id:'2',name:'Siguiendo'},
  {id:'3',name:'Pendientes'},
  {id:'4',name:'Finalizadas'},
  ];
  const activeTab = ref(0);
  const store = useSerieStore();

  const series = computed(() => {
    return store.series.filter(i => {
        return i.estado === 'E'; // Asegúrate de devolver el resultado de la condición de igualdad
    });
  }); 
  onMounted(() => {
    store.getSerie();
  });
</script>

<style lang="css" scoped>

</style>