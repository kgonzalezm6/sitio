<template>
    <modal :open="peliculaStore.isNew" title="Nuevo" icon="plus" class="w-2/3">
        <div class="grid grid-cols-1 gap-3">
            <text-field title="Nombre" option="label" v-model="peliculaStore.pelicula.NOMBRE_PELICULA" />
            <text-field type="date" title="fecha" option="label" v-model="peliculaStore.pelicula.FECHA_PELICULA" />
            <text-field title="tipo" option="select" :datos="tipoStore.tipos" 
            name="NOMBRE_TIPO_PELICULA" values="ID_TIPO_PELICULA" v-model="peliculaStore.pelicula.ID_TIPO_PELICULA" />
            <text-field title="distribuidora" option="select" :datos="empresaStore.empresas" 
            name="NOMBRE_EMPRESA" values="ID_EMPRESA" v-model="peliculaStore.pelicula.ID_EMPRESA" />
        </div>
        <template #footer>
            <btn text="Guardar" icon="save" class="bg-green-500 text-white p-4 font-bold"
                @click="peliculaStore.CreatePelicula()"
                :loading="peliculaStore.loadingNew" />
            <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold"
                @click="peliculaStore.isNew = false" />
        </template>
    </modal>
</template>
<script setup>
import { usePeliculaStore } from '../../stores/pelicula';
import { useTipoStore } from '../../stores/tipo';
import { useEmpresaStore } from '../../stores/empresa';
import { onBeforeMount } from 'vue';
const peliculaStore = usePeliculaStore();
const tipoStore = useTipoStore();
const empresaStore = useEmpresaStore();

onBeforeMount(() => {
    tipoStore.getTipo();
    empresaStore.getEmpresa();
});
</script>