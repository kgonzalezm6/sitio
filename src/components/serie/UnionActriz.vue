<template>
    <modal :open="store.opcion_union" title="Unión" icon="link" class="w-2/3">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div class="col-span-4">
                <Autocomplete :options="store.actrices" labelKey="nombre" returnKey="id_actriz"
                    title="Seleccione una actriz" v-model="store.union.actriz_id" />
            </div>
            <div class="col-span-4">
                <Autocomplete :options="serie.series" labelKey="nombre" returnKey="id_serie"
                    title="Seleccione una serie" v-model="store.union.serie_id" />
            </div>
            <div class="col-span-4">{{store.union}}</div>
            <div class="col-span-3">
                <validate-errors :errors="store.errors" v-if="store.errors != 0" />
            </div>
        </div>

        <template #footer>
            <button @click="store.UnionActrizSerie()" :loading="store.loading_create"
                class="bg-green-400 p-3 text-white rounded-xl mr-auto font-bold">Crear</button>
            <button @click="store.opcion_union = false"
                class="bg-red-400 p-3 text-white rounded-xl font-bold">Cerrar</button>
        </template>
    </modal>
</template>
<script setup>
import { onMounted } from 'vue'
import { useActrizStore } from '../../stores/actriz';
import { useSerieStore } from '../../stores/serie';
const store = useActrizStore();
const serie = useSerieStore();
onMounted(() => {
    store.getActriz();
    serie.getSerie();
});
</script>