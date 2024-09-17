<template>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mx-5">
        <router-link v-for="i in items" :key="i.name" :to="i.route" 
        class="w-[300px] rounded-md shadow-xl overflow-hidden  relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
            <div class="para uppercase text-center leading-none z-40">
                <p
                style="-webkit-text-stroke: 1px rgb(207, 205, 205);
                            -webkit-text-fill-color: transparent;"
                class="z-10 font-bold text-lg -mb-5 tracking-wider text-gray-500"
                >
                {{ i.name }}
                </p>
                <p class="font-bold text-xl tracking-wider text-[#495c48] z-30">
                {{ i.name }}
                </p>
            </div>
            <div
            class="w-[180px] aspect-square relative z-20 after:absolute after:h-1 after:w-full after:opacity-0 after:bg-[#7b956a] after:top-8 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300"
            >
                <img :src="i.image" />
                
                <div
                    class="tooltips absolute top-0 left-0 -translate-x-[150%] p-2 flex flex-col items-start gap-10 transition-all duration-300 group-hover:-translate-x-full"
                >

                <ul class="flex flex-col items-start gap-2" v-for="e in i.list">
                    <li
                    class="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                    <svg
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="3"
                        class="stroke-[#495c48]"
                        stroke="#000000"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="10"
                        width="10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <p class="text-xs font-semibold text-[#495c48]">{{e.item}}</p>
                    </li>

                </ul>
            </div>
            </div>
        </router-link>


      </div>

    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  const items = [
    {name:'Persona', route:'/persona', color:'fill-[#000000]', image: new URL('../assets/img/docs.png', import.meta.url).href, list:[{item:'Chicas'},{item:'Actrices'},{item:'Peliculas'},{item:'Series'}] },
    {name:'Anime', route:'/chica', color:'fill-[#14213d] text-[#ffff]', image: new URL('../assets/img/anime.png',import.meta.url).href, list:[{item:'Anime'},{item:'Categorias'}]},
    {name:'Hentai', route:'/chica', color:'fill-[#f77f00]', image: new URL('../assets/img/hentai.png',import.meta.url).href, list:[{item:'Hentai'},{item:'Categorias'}]},
    {name:'Instagram', route:'/chica', color:'fill-[#fca311]', image: new URL('../assets/img/instagram.png',import.meta.url).href, list:[{item:'Redes Sociales'},{item:'Informacion general'}]},
    {name:'Chicas', route:'/chica', color:'fill-[#fcbf49]', image: new URL('../assets/img/mujer.png',import.meta.url).href, list:[{item:'Redes Sociales'}]},
    {name:'Peliculas', route:'/chica', color:'fill-[#eae2b7]', image: new URL('../assets/img/movies.png',import.meta.url).href,list:[{item:'Peliculas'},{item:'Categorias'}]},
    {name:'Series', route:'/chica', color:'fill-rose-300', image: new URL('../assets/img/series.png',import.meta.url).href, list:[{item:'Series'},{item:'Categorias'}]},
  ];
  
  onMounted(() => {
    console.log('MenuPrincipal montado');
  });
  </script>
  