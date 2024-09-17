<template>
    <div>
        <simple-tabs :tabs="['Datos', 'Estadisticas']" class="mt-10">
            <template #tab-0>
                <div class="flex justify-center my-10">
                    <button class="bg-green-500 text-white font-bold rounded-full h-12 w-12 border-2 
                      border-green-600 hover:scale-110 hover:bg-green-600 transition-all" 
                        @click="store.opcion_nuevo = true"> 
                        <Icon icon="plus" />
                    </button>
                    <button class="ml-4 bg-teal-500 text-white font-bold rounded-full h-12 w-12 border-2 
                      border-teal-600 hover:scale-110 hover:bg-teal-600 transition-all" 
                        @click="store.opcion_union = true"> 
                        <Icon icon="link" />
                    </button>
                </div>
                <div class="my-5">
                    <datatable :data="store.actrices" :headers="store.headers" :loading="store.loading_actrices">
                        <template #foto="{ item }">
                            <img :src="item.foto" :alt="item.nombre" class="h-32">
                        </template>
                        <template #estado="{ item }">
                            <div class="border px-4 rounded-full text-white"
                                :class="[item.estado ? 'bg-green-400' : 'bg-red-400']">{{ item.estado ? 'Activo' :
                                    'Inactivo' }}</div>
                        </template>
                        <template #actions="{ item }">
                                <router-link :to="{ name: 'actrizdetalle', params: { id: item.id_actriz } }">
                                    <Icon icon="eye" class="text-lg text-orange-500 hover:scale-125 mr-2" @click="store.oneactriz = item" />
                                </router-link>
                            <Icon icon="pen-to-square" @click="store.open(item, 1)"
                                class="text-lg text-blue-500 hover:scale-125 mr-2 " />
                            <Icon icon="trash" @click="store.open(item, 2)" class="text-lg text-red-500 hover:scale-125" />
                        </template>
                    </datatable>
                </div>
            </template>
            <template #tab-1>
                <div class="bg-white w-full shadow-xl rounded-xl grid grid-cols-2 gap-2 p-2">
                    <div class="bg-teal-500 h-64 rounded-xl w-full">
                        <apexchart  type="bar" :options="statits.actrices_options" :series="statits.actrices_series" class="h-64" v-if="statits.loading"></apexchart>
                    </div>
                    <div class="bg-teal-500 h-64 rounded-xl w-full"></div>
                    <div class="bg-teal-500 h-64 rounded-xl w-full"></div>
                    <div class="bg-teal-500 h-64 rounded-xl w-full"></div>

                </div>
            </template>
        </simple-tabs>
        <Update />
        <CrearActriz />
        <UnionActriz />
    </div>
</template>
<script setup>
import { onBeforeMount,ref, onMounted, nextTick, watch } from 'vue';
import { useActrizStore } from '@/stores/actriz';
import { useestadisticasStore } from '@/stores/estadisticas';
import Update from '@/components/serie/UpdateActriz.vue'
import CrearActriz from '../../components/serie/CrearActriz.vue';
import UnionActriz from '../../components/serie/UnionActriz.vue';
  const store = useActrizStore();
  const statits = useestadisticasStore();



onBeforeMount(() => {
    store.getActriz();
    statits.top_actrices();
});
</script>
