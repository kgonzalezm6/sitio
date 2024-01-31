<template>
    <div>
        <div class="flex w-40 bg-[#1355BF] h-16 rounded-br-full justify-center">
            <span class="font-monserrat font-extrabold text-[#EDBF18] text-xl">
                <icon icon="fa-solid fa-film" class="mt-4 text-slate-200 text-2xl" />
                ACTRICES
            </span>
        </div>
        <div class="mt-10">
            <btn text="Nuevo" class="bg-green-500 text-white font-bold p-2 rounded-full ml-auto w-24 text-center" />
        </div>
        <div>
            <datatable :data="actrizStore.actrices" :headers="actrizStore.headers">
                <template #FOTO_ACTRIZ="{ item }">
                    <img :src="item.FOTO_ACTRIZ" :alt="item.NOMBRE_ACTRIZ" class="h-40">
                </template>
                <template #ESTADO_ACTRIZ="{ item }">
                    <div class="border px-4 rounded-full text-white"
                        :class="[item.ESTADO_ACTRIZ ? 'bg-green-400' : 'bg-red-400']">{{ item.ESTADO_ACTRIZ ? 'Activo' :
                            'Inactivo' }}</div>
                </template>
                <template #actions="{ item }">
                    <icon icon="pen-to-square" @click="actrizStore.open(item, 1)"
                        class="text-3xl text-blue-500 hover:scale-125 mr-2 " />
                    <icon icon="trash" @click="actrizStore.open(item, 2)" class="text-3xl text-red-500 hover:scale-125" />
                </template>
            </datatable>
        </div>
        <Update />
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useActrizStore } from '../stores/actriz';
import Update from '../components/serie/UpdateActriz.vue'
  const actrizStore = useActrizStore();

onBeforeMount(() => {
    actrizStore.getActriz();

});
</script>

