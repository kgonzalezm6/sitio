<template>
    <div>
        <modal :open="store.option_eliminar" title="Eliminar" icon="pen-to-square" class="w-2/3">
            <div class="grid grid-cols-2 gap-3">

                <div class="col-span-2 grid grid-cols-2 justify-center items-center">
                    <span class="text-red-500 font-extrabold text-5xl text-center">¿Esta seguro de eliminar {{store.one_serie.nombre}}? </span>
                    <img :src="store.one_serie.imagen" :alt="store.one_serie.nombre" class="h-72">
                </div>
            </div>
            <template #footer>
                <btn text="Si, Eliminar" icon="trash" class="bg-green-500 text-white p-4 font-bold"
                     @click="store.deleteSerie()" :loading="store.loading_eliminar"/>
                <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold"
                    @click="store.option_eliminar = false" />
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