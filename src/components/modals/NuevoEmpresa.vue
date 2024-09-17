<template>
    <div>
        <modal :open="store.opcion_nuevo" icon="plus" class="w-[70%]">
                <div v-if="!store.btn_nuevo">
                    <div class="my-5">
                        <text-field option="label" title="nombre" v-model="store.nuevo.nombre"/>
                        <text-field type="url" option="label" title="sitio" v-model="store.nuevo.sitio"/>
                        <text-field acceptedTypes="image/*" option="file" title="imagen" 
                        class="w-full"  @change="handleFileChange"/>
                    </div>
                    <validate-errors :errors="store.errors" v-if="store.errors != 0"/>
                </div>
                <div v-else>
                    <img src="@/assets/img/save.gif" />
                </div>
                
            <template #footer>
                <div class="my-5 md:flex md:my-0 gap-4 flex-col md:flex-row">
                    <div class="w-full md:w-[420px] flex justify-start items-center">
                      <btn text="Cerrar" icon="x" class="bg-red-500 text-white rounded-xl" 
                        @click="store.opcion_nuevo = false, store.reset()" />
                    </div>
                    <div class="w-full md:w-[420px] flex justify-end items-center">
                      <btn text="Guardar" icon="save" class="bg-green-500 text-white rounded-xl" 
                        @click="store.store()" />
                    </div>
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
onMounted(() => {});
</script>

<style scoped>

</style>