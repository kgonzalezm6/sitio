<script setup>
import { useGlobalStore } from '../stores/global'
const store = useGlobalStore()

</script>

<template>
    <div class="transition-all duration-500 ease-in-out inline-flex gap-3 py-3 px-8 fixed border-b-2 border-r-2 border-blue-700 z-30 top-0 rounded-br-full items-center shadow-lg " 
    :class="store.openSidebar ? 'left-52 ' + store.titlePage.color : 'left-0 ' + store.titlePage.color">
      <Icon :icon="store.titlePage.icon" class="text-3xl" :class="store.titlePage.textColor"/>
      <h1 class="text-[#EDBF18] font-bold text-3xl">{{ store.titlePage.title }}</h1>
    </div>
</template>