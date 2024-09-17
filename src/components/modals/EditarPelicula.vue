<template>
    <div>
        <modal :open="store.opcion_editar" icon="edit" class="w-[70%]">
                <div class="my-5" v-if="store.loading_opciones">
                    <div v-if="!store.btn_editar">
                        <text-field option="label" title="nombre" v-model="store.registro.nombre"/>
                        <text-field option="date" title="fecha" v-model="store.registro.fecha"/>
                        <Autocomplete option="select" title="Tipo" :options="tipo.registros"
                        labelKey="nombre" returnKey="id_tipo" class="pl-4" v-model="store.registro.tipo_id"/>
                        <Autocomplete option="select" title="Empresa" :options="empresas"
                        labelKey="nombre" returnKey="id_empresa" class="pl-4" v-model="store.registro.empresa_id"/>
                    </div>
                    <div v-else>
                        <Loading />
                    </div>
                </div>
               
                <validate-errors :errors="store.errors" v-if="store.errors != 0"/>
            <template #footer>
                <btn text="Cerrar" icon="x" class="bg-red-500 text-white rounded-xl"
                    @click="store.opcion_editar = false, store.reset()"/>
                <div class="ml-auto">
                <btn text="Actualizar" icon="save" class="bg-green-500 text-white rounded-xl"
                    @click="store.update()" :loading="store.btn_editar"/>
                </div>
            </template>         
        </modal>
    </div>
</template>

<script setup>
import { onMounted,computed } from 'vue'
import { usePeliculaStore } from '@/stores/pelicula';
import { useEmpresaStore } from '@/stores/empresa';
import { useTipoPeiculaStore } from '@/stores/tipopelicula';
const store = usePeliculaStore();
const empresa = useEmpresaStore();
const tipo = useTipoPeiculaStore();
const handleFileChange = (event) => {
  const file = event.target.files[0];
  console.log('Archivo seleccionado:', file); // Verifica que el archivo se está cargando
  store.imagen = file;
};
const imageUrl = (imagen) => `${import.meta.env.VITE_MY_URL_IMAGE}${imagen}`;

const empresas = computed(() => {
    return empresa.registros.filter((item) => item.estado ='A')
});
onMounted(() => {
    empresa.index();
    tipo.index();
});
</script>

<style scoped>

</style>