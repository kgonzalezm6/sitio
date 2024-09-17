<template>
    <div>
        <modal :open="store.opcion_nuevo" icon="plus" class="w-[70%]">
                <div class="my-5">
                    <text-field option="label" title="nombre" v-model="store.nuevo.nombre"/>
                    <text-field option="date" title="fecha" v-model="store.nuevo.fecha"/>
                    <Autocomplete option="select" title="Tipo" :options="tipo.registros"
                    labelKey="nombre" returnKey="id_tipo" class="pl-4" v-model="store.nuevo.tipo"/>
                    <Autocomplete option="select" title="Empresa" :options="empresas"
                    labelKey="nombre" returnKey="id_empresa" class="pl-4" v-model="store.nuevo.empresa"/>
                   
                </div>
                <pre>{{store.nuevo}}</pre>
                <validate-errors :errors="store.errors" v-if="store.errors != 0"/>
            <template #footer>
                <btn text="Cerrar" icon="x" class="bg-red-500 text-white rounded-xl"
                    @click="store.opcion_nuevo = false, store.reset()"/>
                <div class="ml-auto">
                <btn text="Guardar" icon="save" class="bg-green-500 text-white rounded-xl"
                    @click="store.store()" :loading="store.btn_nuevo"/>
                </div>
            </template>         
        </modal>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
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