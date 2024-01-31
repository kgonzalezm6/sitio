<template>
    <modal :open="empresaStore.isDelete" title="Eliminar" icon="trash" class="w-2/3">
        <div class="grid grid-cols-1 gap-3">
            <span class="font-bold mx-auto text-3xl text-red-700">ESTA SEGURO DE ELIMINAR ESTE REGISTRO?</span>
            <text-field title="Nombre" option="label" v-model="empresaStore.oneempresa.NOMBRE_EMPRESA" disabled/>
            <text-field title="sitio" option="label" v-model="empresaStore.oneempresa.SITIO_EMPRESA" disabled/>
            <text-field title="foto" option="label" v-model="empresaStore.oneempresa.FOTO_EMPRESA" disabled/>
            <div class="bg-gray-700 mx-auto" v-if="empresaStore.oneempresa.FOTO_EMPRESA">
                <img :src="empresaStore.oneempresa.FOTO_EMPRESA" :alt="empresaStore.oneempresa.NOMBRE_EMPRESA">
               
            </div>
        </div>
        <template #footer>
            <btn text="Si, eliminar" icon="save" class="bg-red-500 text-white p-4 font-bold"
                @click="empresaStore.DeleteEmpresa()" />
            <btn text="Cancelar" icon="x" class="bg-cyan-500 text-white p-4 font-bold"
                @click="empresaStore.isDelete = false" />
        </template>
    </modal>
</template>
<script setup>
import { useEmpresaStore } from '../../stores/empresa';
const empresaStore = useEmpresaStore();
</script>