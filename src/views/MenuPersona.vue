<template>
    <div>
        <div
            class="border-2 z-10 border-slate-200 bg-white grid sm:grid-cols-3 md:grid-cols-6 gap-3 
            justify-center items-center rounded-lg mb-10 py-3 px-2"
            v-if="generalStore.VerificaContador">
            <router-link class="my-3 h-24 rounded-lg shadow-lg pl-2 pt-1 grid border-b-4 
            border-red-400 bg-slate-100" 
            v-for="i in generalStore.items" :key="i" :to="i.route">
                <span class="truncate">{{ i.name }}</span>
                <span class="text-cyan-800 font-bold text-center text-4xl">{{ i.total }}</span>
            </router-link>
        </div>
        <div
            class="border-2 z-10 border-slate-200 bg-white grid grid-cols-2 gap-3 justify-center items-center 
            rounded-lg mb-10 py-3 px-2">
            <div class=" h-96 shadow-lg border-2 border-slate-200"></div>
            <div class=" h-96 shadow-lg border-2 border-slate-200"></div>
            <div class=" h-96 shadow-lg border-2 border-slate-200"></div>
            <div class=" h-96 shadow-lg border-2 border-slate-200"></div>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount,ref } from 'vue';
import { useGeneralStore } from '../stores/general.js'

const generalStore = useGeneralStore();
onBeforeMount(() => {
    generalStore.getContador();
});
</script>