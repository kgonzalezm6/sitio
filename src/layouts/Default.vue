<script setup>
    import SideBar from './SideBar.vue'
    import Footer from './Footer.vue'
    import TitlePage from '../components/TitlePage.vue'
    import { useGlobalStore } from '../stores/global';

    const store = useGlobalStore()
    
    

</script>

<template>
<toast v-if="store.alert.message.length > 0" :message="store.alert.message" />
    <div class="bg-gray-100">
        <SideBar/>
        <TitlePage />
        <main class="px-2 md:px-5 lg:px-10 transition-[margin] duration-500 pt-20" :class=" store.openSidebar ? 'ml-52' : 'ml-20'">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>