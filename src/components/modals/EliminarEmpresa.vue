<template>
    <div>
        <modal :open="store.opcion_eliminar" icon="edit" class="w-[70%]">
                <div class="my-5" v-if="store.loading_opciones">
                    {{ store.registro }}
                </div>
                <validate-errors :errors="store.errors" v-if="store.errors != 0"/>
            <template #footer>
                <btn text="Cerrar" icon="x" class="bg-red-500 text-white rounded-xl"
                    @click="store.opcion_eliminar = false, store.reset()"/>
                <div class="ml-auto">
                <btn text="Guardar" icon="save" class="bg-green-500 text-white rounded-xl"
                    @click="store.destroy()"/>
                </div>
            </template>         
        </modal>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useEmpresaStore } from '@/stores/empresa';

const store = useEmpresaStore();
const handleFileChange = (event) => {
  const file = event.target.files[0];
  console.log('Archivo seleccionado:', file); // Verifica que el archivo se está cargando
  store.imagen = file;
};
const imageUrl = (imagen) => `${import.meta.env.VITE_MY_URL_IMAGE}${imagen}`;
onMounted(() => {});
</script>

<style scoped>

</style>