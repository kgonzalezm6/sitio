<template>
    <div>
        <div v-if="store.loading_chicas">
            <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
            <div class="flex items-center my-10 justify-center gap-2">
                <btn icon="plus" type="circulo" text="agregar nuevo" color="green-muni text-white"/>
                <btn icon="p" type="circulo" text="Peliculas" class="text-white"/>
                
            </div>
            <div>
                <datatable :data="store.chicas" :headers="store.headers" :loading="store.loading_chicas">
                    <template #SITIO_CHICA="{ item }">
                        <a :href="item.SITIO_CHICA" target="_blank">{{ item.NOMBRE_CHICA }}</a>
                    </template>
                    <template #foto="{ item }">
                        <div class="mx-auto w-48">
                                <img :src="item.foto" :alt="item.nombre" @click="redirect(item.id_chica)" class="h-40">
                        </div>
                    </template>
                    <template #estado="{ item }">
                        <div class="border rounded-full text-white text-center w-36"
                            :class="[item.estado ? 'bg-green-400' : 'bg-red-400']">{{ item.estado ? 'Activo' :
                                'Inactivo' }}</div>
                    </template>
                    <template #actions="{ item }">
                        <Icon icon="pen-to-square" @click="store.open(item, 1)"
                            class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                        <Icon icon="trash" @click="store.open(item, 3)" 
                        class="text-3xl text-red-500 hover:scale-125" />
                    </template>
                </datatable>
            </div>
        </div>
        <div v-else>
            <Loading />
        </div>
        <!-- <EditChica />
        <CrearChica />
        <DeleteChica />
        <DeleteEmpresa /> -->
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useChicaStore } from '../../stores/chica';
import { useGlobalStore } from '../../stores/global';
// import EditChica from '../components/serie/EditChica.vue';
// import DeleteChica from '../components/serie/DeleteChica.vue';
// import CrearChica from '../components/serie/CrearChica.vue';
// import DeleteEmpresa from '../components/serie/DeleteEmpresa.vue'
import { onBeforeRouteLeave, useRouter } from "vue-router"
const store = useChicaStore();
const globalStore = useGlobalStore();
const router = useRouter();
globalStore.changeTitlePage('Chicas');
const breadcrumbs = [
  { name: 'Home', path: '/', icon: 'fas fa-home' },
  { name: 'Persona', path: '/persona'},
  { name: 'Chicas', path: '' }
];
onMounted(() => {
    store.getChica();
});
onBeforeRouteLeave((to, from, next) => {
    globalStore.changeTitlePage('');
  next();
});
function redirect(id) {
    router.push({ name: 'Chica', params: { id: id } })
};
</script>

