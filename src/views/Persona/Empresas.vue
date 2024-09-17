<template>
    <div>
        <div v-if="store.loading_registros">
            <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
            <div class="flex items-center my-10 justify-center gap-2">
                <btn icon="plus" type="circulo" text="agregar nuevo" color="green-muni" class="text-white"
                    @click="store.opciones(1)"/>
                <btn icon="p" type="circulo" text="Peliculas" class="text-white"
                @click="pelicula()"/>
                
            </div>
            <div>
                <datatable :data="store.registros" :headers="store.headers" :loading="store.loading_registros">
                    <template #sitio="{ item }">
                        <a :href="item.sitio" target="_blank">{{ item.nombre }}</a>
                    </template>
                    <template #imagen="{ item }">
                        <div class="mx-auto w-48">
                                <img  :src="imageUrl(item.imagen)" :alt="item.nombre" class="h-[5rem] hover:cursor-pointer"
                                :class="[item.id_empresa == 14 || item.id_empresa == 15 ? 'bg-slate-900': '']"
                                @click="redirect(item.id_empresa)">
                        </div>
                    </template>
                    <template #estado="{ item }">
                        <span class="border rounded-full text-white text-center w-36 px-2 py-1"
                            :class="[item.estado == 'A' ? 'bg-green-400' : 'bg-red-400']">{{ item.estado == 'A' ? 'Activo' :
                                'Inactivo' }}</span>
                    </template>
                    <template #actions="{ item }">
                        <Icon icon="pen-to-square" @click="store.opciones(2,item)"
                            class="text-3xl text-cyan-500 hover:scale-110 mr-2  cursor-pointer" />
                        <Icon icon="trash" @click="store.opciones(3, item)" 
                        class="text-3xl text-red-500 hover:scale-110 cursor-pointer" />
                    </template> 
                </datatable>
            </div>
        </div>
        <div v-else>
            <Loading />
        </div>
        <NuevoEmpresa />
        <EditarEmpresa />
        <EliminarEmpresa />
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useEmpresaStore } from '@/stores/empresa';
import { useGlobalStore } from '@/stores/global';
import NuevoEmpresa from '@/components/modals/NuevoEmpresa.vue';
import EditarEmpresa from '@/components/modals/EditarEmpresa.vue';
import { onBeforeRouteLeave, useRouter } from "vue-router"
import EliminarEmpresa from '../../components/modals/EliminarEmpresa.vue';
const store = useEmpresaStore();
const globalStore = useGlobalStore();
const router = useRouter();
globalStore.changeTitlePage('Chicas');

const breadcrumbs = [
  { name: 'Home', path: '/', icon: 'fas fa-home' },
  { name: 'Empresas', path: '' }
];

const imageUrl = (imagen) => `${import.meta.env.VITE_MY_URL_IMAGE}${imagen}`;
onMounted(() => {
    store.index();
});
onBeforeRouteLeave((to, from, next) => {
    globalStore.changeTitlePage('');
  next();
});
function redirect( item ) {
    router.push({ name: 'Empresa', params: { id : item  }  })
};
function pelicula() {
    router.push({ name: 'Peliculas' })
};
</script>

