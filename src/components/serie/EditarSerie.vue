<template>
    <div>
        <modal :open="store.option_editar" title="Editar" icon="pen-to-square" class="w-2/3">
            <div class="grid grid-cols-2 gap-3 mt-4">
                <text-field title="Nombre" option="label" v-model="store.one_serie.nombre" />
                <text-field type="date" title="fecha" option="label" v-model="store.one_serie.fecha" />
                <text-field title="sitio" option="label" v-model="store.one_serie.sitio" />
                <text-field title="estado" option="select" :datos="store.estados" name="nombre" values="id" v-model="store.one_serie.estado"/>
                <text-field title="visualizacion" option="select" :datos="store.visualizaciones" name="nombre" values="id" v-model="store.one_serie.visualizacion"/>
                <text-field title="foto" option="label" v-model="store.one_serie.imagen" />
                <div class="col-span-2 flex justify-center items-center">
                    <img :src="store.one_serie.imagen" :alt="store.one_serie.nombre" class="h-48">
                  </div>
            </div>
            <template #footer>
                <btn text="Guardar" icon="save" class="bg-green-500 text-white p-4 font-bold"
                     @click="store.updateSerie()" :loading="store.loading_editar"/>
                <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold"
                    @click="store.option_editar = false" />
            </template>
        </modal>
    </div>
</template>

<script setup>
    import { useSerieStore } from '@/stores/serie';

    const store = useSerieStore();
</script>

<style lang="css" scoped>

</style>