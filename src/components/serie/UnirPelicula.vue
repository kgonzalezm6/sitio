<template>
    <modal :open="peliculaStore.isUnir" title="Unir" icon="code-merge" class="w-2/3">
        <div class="grid grid-cols-1 gap-3">
            <v-select :reduce="pelicula => pelicula.ID_PELICULA" :options="peliculaStore.peliculas" label="NOMBRE_PELICULA"
                v-model="peliculaStore.peliculachica.pelicula" :required="!peliculaStore.peliculachica.pelicula"
                placeholder="Selecciona una pelicula" append-to-body>
                <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                        No se han encontrado resultados para <em>{{ search }}</em>.
                    </template>
                    <em v-else style="font-bold">Busque una pelicula</em>
                </template>

                <slot name="spinner">
                    <div class="spinner" v-show="true">Cargando...</div>
                </slot>
            </v-select>
            <v-select multiple :reduce="chica => chica.ID_CHICA" :options="chicaStore.chicas" label="NOMBRE_CHICA"
                v-model="peliculaStore.peliculachica.chica" :required="!peliculaStore.peliculachica.chica"
                placeholder="Selecciona una chica" append-to-body>
                <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                        No se han encontrado resultados para <em>{{ search }}</em>.
                    </template>
                    <em v-else style="font-bold">Busque una chica</em>
                </template>
                <template #option="{ NOMBRE_CHICA, FOTO_CHICA }">
                    <em class="flex">
                        <img :src="FOTO_CHICA" :alt="NOMBRE_CHICA" class="h-14">
                        <div class="ml-4 font-bold">{{ NOMBRE_CHICA }}</div>
                    </em>
                </template>
                <slot name="spinner">
                    <div class="spinner" v-show="true">Loading...</div>
                </slot>
            </v-select>

        </div>
        <template #footer>
            <btn text="Guardar" icon="save" class="bg-green-500 text-white p-4 font-bold"
                @click="peliculaStore.UnirPelicula()" />
            <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold"
                @click="peliculaStore.isUnir = false" />
        </template>
    </modal>
</template>
<script setup>
import { usePeliculaStore } from '../../stores/pelicula';
import { useChicaStore } from '../../stores/chica';
import { useEmpresaStore } from '../../stores/empresa';
import { onBeforeMount } from 'vue';
const peliculaStore = usePeliculaStore();
const chicaStore = useChicaStore();
const empresaStore = useEmpresaStore();

onBeforeMount(() => {
    peliculaStore.getPelicula();
    chicaStore.getChica();
});
</script>