<template>
    <div>
        <div v-if="store.loading_registros">
            <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
            <div class="flex items-center my-10 justify-center gap-2">
                <btn icon="plus" type="circulo" text="agregar nuevo" color="green-muni" class="text-white"
                    @click="store.opciones(1)"/>
                <btn icon="rotate" type="circulo" text="unir" class="text-white"
                @click="store.opciones(4)"/>
                
            </div>
            <div>
                    <datatable 
                        :data="store.registros" 
                        :headers="store.headers" 
                        :loading="store.loading_registros"
                    >
                        <template #sitio="{ item }">
                            <a :href="item.sitio" target="_blank">{{ item.nombre }}</a>
                        </template>
                        <template #imagen="{ item }">
                            <div class="mx-auto w-48">
                                <img :src="imageUrl(item.imagen)" :alt="item.nombre" class="h-[5rem]" />
                            </div>
                        </template>
                        <template #estado="{ item }">
                            <span :class="['border rounded-full text-white text-center w-36 px-2 py-1', item.estado ? 'bg-green-400' : 'bg-red-400']">
                                {{ item.estado ? 'Activo' : 'Inactivo' }}
                            </span>
                        </template>
                        <template #actions="{ item }">
                            <Icon 
                                icon="pen-to-square" 
                                @click="store.opciones(2, item)" 
                                class="text-3xl text-cyan-500 hover:scale-110 mr-2 cursor-pointer" 
                            />
                            <Icon 
                                icon="trash" 
                                @click="store.opciones(3, item)" 
                                class="text-3xl text-red-500 hover:scale-110 cursor-pointer" 
                            />
                        </template>
                    </datatable>              
            </div>
        </div>
        <div v-else>
            <Loading />
        </div>
         <NuevoPelicula />
        <EditarPelicula />
        <UnirPelicula />
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { usePeliculaStore } from '@/stores/pelicula';
import { useGlobalStore } from '@/stores/global';
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import NuevoPelicula from '@/components/modals/NuevoPelicula.vue';
import EditarPelicula from '@/components/modals/EditarPelicula.vue';
import UnirPelicula from '../../components/modals/UnirPelicula.vue';
const store = usePeliculaStore();
const globalStore = useGlobalStore();
const router = useRouter();

const imageUrl = (imagen) => `${import.meta.env.VITE_MY_URL_IMAGE}${imagen}`;
onMounted(() => {
    store.index();
});
onBeforeRouteLeave((to, from, next) => {
    globalStore.changeTitlePage('');
  next();
});

const handleRowClick = (id) => {
router.push({ name: 'item-detail', params: { id } });
};
function redirect(id) {
    router.push({ name: 'Chica', params: { id: id } })
};
</script>

