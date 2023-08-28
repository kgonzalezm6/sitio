<script setup>
    import NavBar from '../components/NavBar.vue'
    import { useGlobalStore } from '../stores/global';
   const globalStore = useGlobalStore()
</script>

<template>
    <NavBar title="Título de ejemplo"/>
    <toast v-if="globalStore.alert.message.length > 0" :message="globalStore.alert.message" />
    <main class="mt-20 container mx-auto">
        <RouterView />
    </main>
</template>