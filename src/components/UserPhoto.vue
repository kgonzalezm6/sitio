<script setup>
    const props = defineProps(['name'])
</script>

<template>
    <img v-if="name.image" :src="'http://172.23.25.31/GestionServicios/'+name.image" class="rounded-full border-2 border-gray-300 bg-lime-600 h-14 w-14 object-cover" >
    <span v-else class="text-blue-400 text-lg rounded-full overflow-hidden border-2 border-gray-300 bg-cyan-50 flex justify-center items-center h-14 w-14">{{ name.inicial }}</span>
</template>