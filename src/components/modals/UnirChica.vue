<template>
    <div>
        <modal :open="store.opcion_unir" icon="rotate" class="w-[70%]">
                <div class="my-5" v-if="store.loading_opcion">
                    <div v-if="!store.btn_unir">
                       <Autocomplete v-model="store.unir.chica" :options="store.registros" labelKey="nombre" returnKey="id_chica"/>
                       <div class="border-2 border-gray-100 py-2 flex justify-center">
                           <button class="bg-teal-500 text-white rounded-full h-8 w-8" @click="store.add()">
                                <Icon icon="plus" />
                            </button>
                       </div>
                       <div class="flex justify-center items-center gap-2" v-for="(pelicula, index) in store.unir.peliculas" :key="index">
                            <!-- Vincular dinámicamente el v-model al objeto específico dentro del array -->
                            <Autocomplete v-model="store.unir.peliculas[index].id_pelicula" :options="peliculas" labelKey="nombre" returnKey="id_pelicula" />
                            
                            <!-- Botón para agregar más películas -->
                            <button class="bg-red-500 text-white rounded-full h-8 w-8" @click="store.remove(index)">
                                <Icon icon="close" />
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <Loading />
                    </div>
                </div>              
                <validate-errors :errors="store.errors" v-if="store.errors != 0"/>
            <template #footer>
                <btn text="Cerrar" icon="x" class="bg-red-500 text-white rounded-xl"
                    @click="store.opcion_unir = false, store.reset()"/>
                <div class="ml-auto">
                <btn text="Unir" icon="save" class="bg-green-500 text-white rounded-xl"
                    @click="store.join()" :loading="store.btn_unir"/>
                </div>
            </template>         
        </modal>
    </div>
</template>

<script setup>
import { onMounted,computed } from 'vue'
import { useChicaStore } from '@/stores/chica';
import { usePeliculaStore } from '@/stores/pelicula';

const store = useChicaStore();
const pelicula = usePeliculaStore();
const imageUrl = (imagen) => `${import.meta.env.VITE_MY_URL_IMAGE}${imagen}`;

const peliculas = computed(() => {
    return pelicula.registros.filter((item)=> item.estado == 'ACTIVO')
})
onMounted(() => {
    pelicula.index();
});
</script>

<style scoped>

</style>