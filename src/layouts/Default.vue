<script setup>
import SideBar from './SideBar.vue'
import Footer from './Footer.vue'
import TitlePage from '../components/TitlePage.vue'
import { useGlobalStore } from '../stores/global';

const store = useGlobalStore()
</script>

<template>
  <toast v-if="store.toast.message.length > 0" :message="store.toast.message" />
  <div>
    <main class="px-2 md:px-5 lg:px-10 transition-[margin] duration-500 pt-10" :class="store.openSidebar ? 'ml-52' : 'ml-0'">
      <router-view /> <!-- Cambio realizado aquí -->
    </main>
  </div>
</template>
