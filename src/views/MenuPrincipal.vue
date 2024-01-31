<template>
    <div>
        <div class="border-2 z-10 border-slate-200  bg-white grid justify-center items-center rounded-lg mb-10 py-3">
                <router-link 
                v-for="i in items" :key="i"  
                class="border border-blue-400 h-24 w-96 my-3 flex items-center justify-center font-bold rounded-lg"
                :to="i.route"
                :class="i.color">
                {{ i.name }}
                </router-link>
        </div>
    </div>
</template>
<script setup>
    const items = [
    {name:'Persona',route:'menupersona', color:'bg-[#000000] text-[#ffff]'},
    {name:'Anime',route:'chica', color:'bg-[#14213d] text-[#ffff]'},
    {name:'Hentai',route:'chica', color:'bg-[#f77f00]'},
    {name:'Instagram',route:'chica', color:'bg-[#fca311]'},
    {name:'Chicas',route:'chica', color:'bg-[#fcbf49]'},
    {name:'Peliculas',route:'chica', color:'bg-[#eae2b7]'},
    {name:'Series',route:'chica', color:'bg-[#ffffff]'},
    ];
</script>