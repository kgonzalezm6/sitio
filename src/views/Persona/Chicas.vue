<template>
    <div>
        <div v-if="store.loading_registros">
            <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
            <div class="flex items-center my-10 justify-center gap-2">
                <btn icon="plus" type="circulo" text="agregar nuevo" color="green-muni text-white"
                @click="nuevo()"/>
                <btn icon="rotate" type="circulo" text="Union" class="text-white"
                @click="store.opciones(4)"/>              
            </div>
            <div>
                <datatable :data="store.registros" :headers="store.headers" :loading="store.loading_registros">
                    <template #nombre="{ item }">
                        <span  @click="redirect(item.id_chica)" class="cursor-pointer">{{ item.nombre }}</span>
                    </template>
                    <template #foto="{ item }">
                        <div class="mx-auto w-48">
                                <img :src="imageUrl(item.foto)" :alt="item.nombre" @click="redirect(item.id_chica)" class="h-40 cursor-pointer">
                        </div>
                    </template>
                    <template #estado="{ item }">
                        <span class="border rounded-full text-white text-center px-2 py-1"
                            :class="[item.estado ? 'bg-green-400' : 'bg-red-400']">{{ item.estado ? 'Activo' :
                                'Inactivo' }}</span>
                    </template>
                    <template #actions="{ item }">
                        <Icon icon="pen-to-square" @click="editar(item.id_chica)"
                            class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                        <Icon icon="trash" @click="store.opciones(3,item)" 
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
        <UnirChica />
        <div>
            <button @click="openModal" class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
              Eliminar elemento
            </button>
        
            <Eliminar 
              :isOpen="isModalOpen" 
              @close="closeModal" 
              @confirm="deleteItem"
            />
          </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useChicaStore } from '../../stores/chica';
import { useGlobalStore } from '../../stores/global';
// import EditChica from '../components/serie/EditChica.vue';
// import DeleteChica from '../components/serie/DeleteChica.vue';
// import CrearChica from '../components/serie/CrearChica.vue';
// import DeleteEmpresa from '../components/serie/DeleteEmpresa.vue'
import { onBeforeRouteLeave, useRouter } from "vue-router"
import { imageUrl } from '@/functions/image';
import UnirChica from '@/components/modals/UnirChica.vue';
const store = useChicaStore();
const globalStore = useGlobalStore();
const router = useRouter();
globalStore.changeTitlePage('Chicas');
const breadcrumbs = [
  { name: 'Home', path: '/', icon: 'fas fa-home' },
  { name: 'Persona', path: '/persona'},
  { name: 'Chicas', path: '' }
];
function redirect(id) {
    router.push({ name: 'Chica', params: { id: id } })
};
function nuevo() {
    router.push({ name: 'NuevoChica'})
};
function editar(id) {
    router.push({ name: 'EditarChica', params: { id: id }})
};

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const deleteItem = () => {
  // Aquí iría la lógica para eliminar el elemento
  console.log('Elemento eliminado');
  closeModal();
};

onMounted(() => {
    store.getChica();
});
onBeforeRouteLeave((to, from, next) => {
    globalStore.changeTitlePage('');
  next();
});
</script>

