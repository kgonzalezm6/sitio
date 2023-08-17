<script setup>
    import UserCard from './UserCard.vue';
    import { useAuthStore } from '../stores/auth'

    const authStore = useAuthStore()
    
</script>

<template>
    <nav class="fixed w-full top-0 h-16 px-5 py-1 bg-lime-500 shadow-lg border-b-2 border-lime-600 z-10">
        <div class="flex justify-between items-start">
            <a href="../../" class="flex space-x-4 items-center">
                <img src="../assets/img/logoDcai.png" class="w-auto h-20">
                <h1 class="text-3xl font-bold text-lime-100">Prescripciones</h1>
            </a>
            <div></div>
            <div>
                <UserCard :user="authStore.authUser" />
            </div>
        </div>
    </nav>
</template>