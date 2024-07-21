<template>
    <div>
        <div class="flex justify-center mt-10">
            <button class="bg-green-500 text-white font-bold rounded-full h-16 w-16 border-2 border-green-600 hover:scale-125 hover:bg-green-600 transition-all" 
                @click="store.opcion_nuevo = true"> 
                <icon icon="plus" />
            </button>
            <button class="ml-4 bg-teal-500 text-white font-bold rounded-full h-16 w-16 border-2 border-teal-600 hover:scale-125 hover:bg-teal-600 transition-all" 
                @click="store.opcion_union = true"> 
                <icon icon="link" />
            </button>
        </div>
        <div>
            <datatable :data="store.actrices" :headers="store.headers" :loading="store.loading_actrices">
                <template #foto="{ item }">
                    <img :src="item.foto" :alt="item.nombre" class="h-40">
                </template>
                <template #estado="{ item }">
                    <div class="border px-4 rounded-full text-white"
                        :class="[item.estado ? 'bg-green-400' : 'bg-red-400']">{{ item.estado ? 'Activo' :
                            'Inactivo' }}</div>
                </template>
                <template #actions="{ item }">
                        <router-link :to="{ name: 'actrizdetalle', params: { id: item.id_actriz } }">
                            <icon icon="eye" class="lg:text-3xl text-xl text-orange-500 hover:scale-125 mr-2" @click="store.oneactriz = item" />
                        </router-link>
                    <icon icon="pen-to-square" @click="store.open(item, 1)"
                        class="lg:text-3xl text-xl text-blue-500 hover:scale-125 mr-2 " />
                    <icon icon="trash" @click="store.open(item, 2)" class="lg:text-3xl text-xl text-red-500 hover:scale-125" />
                </template>
            </datatable>
        </div>
        <Update />
        <CrearActriz />
        <UnionActriz />
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useActrizStore } from '@/stores/actriz';
import Update from '@/components/serie/UpdateActriz.vue'
import CrearActriz from '../../components/serie/CrearActriz.vue';
import UnionActriz from '../../components/serie/UnionActriz.vue';
  const store = useActrizStore();

onBeforeMount(() => {
    store.getActriz();

});
</script>

