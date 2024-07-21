<template>
    <modal :open="store.opcion_union" title="Unión" icon="link" class="w-2/3">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="col-span-4">
                <text-field v-model="store.union.actriz_id" :datos="store.actrices" option="select" title="actrices"  name="nombre" values="id_actriz" 
                 :class="[store.errors.actriz_id ? 'border border-red-500' : '']" class="w-full"/>
            </div>
            <div class="col-span-4">
                <text-field v-model="store.union.serie_id" :datos="serie.series" option="select" title="series"  name="nombre"  values="id_serie" 
                :class="[store.errors.serie_id ? 'border border-red-500' : '']" class="w-full"/>
            </div>
            
            <div class="col-span-3">
                <validate-errors :errors="store.errors" v-if="store.errors != 0" />
            </div>
        </div> 

        <template #footer>
            <button @click="store.UnionActrizSerie()" :loading="store.loading_create" class="bg-green-400 p-3 text-white rounded-xl mr-auto font-bold">Crear</button>
            <button @click="store.opcion_union = false" class="bg-red-400 p-3 text-white rounded-xl font-bold">Cerrar</button>
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