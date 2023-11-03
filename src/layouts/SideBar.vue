<script setup>
    import { useGlobalStore } from '../stores/global'
    
    const store = useGlobalStore()

    const menus = [
        {title : 'Inicio', icon : 'fas fa-house-user', route : '#' }, 
        {title : 'Portal de certificaciones', icon : 'fas fa-medal', route : '#' }, 
        {title : 'Configuración', icon : 'fas fa-gear', route : '#' }, 
        {title : 'Regresar', icon : 'fas fa-left-long', route : '#' }, 
        {title : 'Cerrar sesión', icon : 'fas fa-right-from-bracket', route : '#' }
    ]

</script>

<template>
    <div :class="store.openSidebar ? 'w-52' : 'w-20'" class="fixed hover:text-blue-600 z-20 h-screen transition-[width] duration-500 ease-in-out top-0">
        <div class="bg-lime-muni rounded-br-[6rem] border-2 border-lime-600 shadow-xl shadow-lime-800 h-screen overflow-auto no-scrollbar">
            <!-- <icon @click="store.openSidebar = !store.openSidebar" icon="fa-solid fa-bars" class="text-white rounded-full bg-lime-500 text-xl p-3 border-2 border-lime-600 absolute -right-4 hover:scale-110 cursor-pointer" /> -->
            <div class="flex justify-center py-14">
                <a @click="store.updateOpenSidebar" class="cursor-pointer">
                    <img src="../assets/img/sidebar/logo.png" class="w-auto transition-[height] duration-500 ease-in-out" :class=" store.openSidebar ? 'h-32' : 'h-14'">
                </a>
            </div>
            <div>
                <ul class=" divide-y-2 divide-green-600 px-4 text-blue-muni">
                    <li></li>
                    <li v-for="(menu,index) in menus" :key="index"  class="flex items-center gap-3 py-7 cursor-pointer hover:scale-105 transition hover:text-blue-600">
                        <icon :icon="menu.icon" class="text-4xl " />
                        <span class=" font-bold text-sm" :hidden="!store.openSidebar" >{{ menu.title }}</span>
                    </li>
                    <li class="py-7"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>

.no-scrollbar::-webkit-scrollbar {
    display: none;
}


.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
