<template>
    <div>
        <modal :open="store.opcion_unir" icon="rotate" class="w-[70%]">
                <div class="my-5" v-if="store.loading_opciones">
                    <div v-if="!store.btn_unir">
                       {{ store.opcion_unir }}
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
                <btn text="Actualizar" icon="save" class="bg-green-500 text-white rounded-xl"
                    @click="store.update()" :loading="store.btn_unir"/>
                </div>
            </template>         
        </modal>
    </div>
</template>

<script setup>
import { onMounted,computed } from 'vue'
import { usePeliculaStore } from '@/stores/pelicula';

const store = usePeliculaStore();
const imageUrl = (imagen) => `${import.meta.env.VITE_MY_URL_IMAGE}${imagen}`;
onMounted(() => {

});
</script>

<style scoped>

</style>