<script setup>
    import { useAuthStore } from '../stores/auth'
    import UserPhoto from '../components/UserPhoto.vue'
    import axios from 'axios'
    import { onMounted, ref, computed } from 'vue'
    import CardCollapse from '../components/CardCollapse.vue'
    import TitlePage from '../components/TitlePage.vue'
import { rand } from '@vueuse/core'
    
    const authStore = useAuthStore()
    const menus = ref([])
    const search = ref('')


    async function fetchMenu() {
        const response = await axios.get('menu')
        menus.value = response.data
    }

    const result = computed(() => {
        return menus.value.map(menu => {
            return menu.options.filter(option => {
                return option.descripcion.toLowerCase().match(search.value.toLowerCase())
            })
        }).flat()
   })

   function setUrl(){
        const link = document.createElement('a')
        link.href = 'http://172.23.25.31/GestionServicios/' + search.value
        link.setAttribute('target', '_blank')
        document.body.appendChild(link)
        link.click()
   }

   const colors = [
    'bg-[#f5333f]',
    'bg-[#ffce00]',
    'bg-[#ffce00]',
    'bg-[#97d700]',
    'bg-[#00bc70]',
    'bg-[#54c8e8]',
    'bg-[#1700a5]',
   ]



    onMounted(()=>{
        fetchMenu()
    });

</script>

<template>
    <!-- <TitlePage/> -->
    <div class="py-6">
        <header class="md:flex items-center justify-center lg:gap-20">
            <div class="flex justify-center">
                <userPhoto :user="authStore.user" class=" w-52 h-52 lg:h-60 lg:w-60 " />
            </div>
            <div class="text-center text-blue-muni">
                <h1 class="font-black md:text-3xl">{{ authStore.user.fullname }}</h1>
                <p class="md:text-3xl">NIT: {{ authStore.user.nit }}</p>
                <span class="bg-lime-500 md:text-2xl font-semibold px-10 rounded-lg">{{ authStore.user?.area?.descripcion }}</span>
            </div>
        </header>
        <br>
        <br>
        <div class="flex justify-center">
            <text-field option="label" title="Buscar:" v-model="search" list="data" type="search" @change="setUrl" class="w-96" autocomplete="off"/>
            <datalist id="data">
                <option v-for="(option,index) in result" :key="index" :value="option.ruta">{{ option.descripcion }}</option>
            </datalist> 
        </div>
        <br>
        <section class="flex justify-center items-center">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 md:gap-x-14 md:gap-y-8 gap-3">
                <CardCollapse v-for="(menu,index) in menus" :key="index" :menu="menu" :class="colors[rand(0,6)]"/>
            </div>
        </section>
    </div>
</template>

