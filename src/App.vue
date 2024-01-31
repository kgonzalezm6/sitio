<script setup>

import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

import LoadingBar from './components/LoadingBar.vue'
import BackTop from './components/BackTop.vue'

const authStore = useAuthStore()
  
  onMounted(()=>{
    authStore.login()
  })

</script>

<template>
  <RouterView />
  <BackTop />
</template>

