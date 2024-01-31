<template>
    <modal :open="empresaStore.isNew" title="Nuevo" icon="plus" class="w-2/3">
        <div class="grid grid-cols-1 gap-3">
            <text-field title="Nombre" option="label" v-model="empresaStore.empresa.NOMBRE_EMPRESA" />
            <text-field title="sitio" option="label" v-model="empresaStore.empresa.SITIO_EMPRESA" />
            <text-field title="foto" option="label" v-model="empresaStore.empresa.FOTO_EMPRESA" />
            <div class="bg-gray-700 mx-auto">
                <img :src="empresaStore.oneempresa.FOTO_EMPRESA" :alt="empresaStore.oneempresa.NOMBRE_EMPRESA">
            </div>
        </div>
        <template #footer>
            <btn text="Guardar" icon="save" class="bg-green-500 text-white p-4 font-bold"
                @click="empresaStore.CreateEmpresa()" />
            <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold"
                @click="empresaStore.isNew = false" />
        </template>
    </modal>
</template>
<script setup>
import { useEmpresaStore } from '../../stores/empresa';
const empresaStore = useEmpresaStore();
</script>