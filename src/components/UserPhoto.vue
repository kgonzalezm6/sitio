<script setup>
    const props = defineProps(['user'])
</script>

<template>
    <img v-if="user.image" :src="'http://172.23.25.31/GestionServicios/'+user.image" class="rounded-full border-2 border-gray-300 bg-lime-600 object-cover" >
    <span v-else class="text-blue-400 text-lg rounded-full overflow-hidden border-2 border-gray-300 bg-cyan-50 flex justify-center items-center">{{ user.inicial }}</span>
</template>