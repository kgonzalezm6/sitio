<template>
    <div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
        <div class="shadow-all w-full bg-white grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-6 rounded-xl mb-10" v-if="store.loading_registro">
            <div class="col-span-2">
                <text-field option="label" title="nombre" v-model="store.registro.nombre"/>
            </div>
            <v-select v-model="store.registro.etnia_id" title="etnia" :options="etnia.etnias" label="nombre" :reduce="item => item.id_etnia" :loading="etnia.loading_etnias"/>
            <v-select v-model="store.registro.nacionalidad_id" title="nacionalidad" :options="nacionalidad.nacionalidades" label="nombre" :reduce="item => item.id_nacionalidad" :loading="nacionalidad.loading_nacionalidades"/>
            <v-select v-model="store.registro.cabello_id" title="color de cabello" :options="cabello.cabellos" label="nombre" :reduce="item => item.id_cabello" :loading="cabello.loading_cabellos"/>
            <text-field option="numeric" title="alto" v-model="store.registro.altura"/>
            <text-field option="numeric" title="peso" v-model="store.registro.peso"/>
            <text-field option="label" title="medidas" v-model="store.registro.medidas"/>
            <div class="col-span-2">
                <text-field option="label" title="tatuajes" v-model="store.registro.tatuajes"/>
            </div>
            <div class="col-span-2">
                <text-field option="label" title="piercing" v-model="store.registro.piercing"/>
            </div>
            <text-field option="label" title="alias" v-model="store.registro.alias"/>
            <text-field option="date" title="fecha de nacimiento" v-model="store.registro.fecha"/>
            <v-select title="Astrologia" v-model="store.registro.astrologia_id" :options="astrologia.astrologias" label="nombre" :reduce="item => item.id_astrologia" :loading="astrologia.loading_astrologias"/>
            <v-select title="Lugar de nacimiento" v-model="store.registro.lugarnac_id" :options="lugarnac.lugarnac" label="nombre" :reduce="item => item.id_lugarnac" :loading="lugarnac.loading_lugarnac">
                <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No results found for <em>{{ search }}</em
                      >.
                    </template>
                    <em v-else style="opacity: 0.5">Start typing to search for a country.</em>
                </template>
            </v-select>
            <text-field option="year" title="comienzo" v-model="store.registro.comienzo"/>
            <text-field option="year" title="final" v-model="store.registro.final"/>
            <text-field option="url" title="instagram" v-model="store.registro.instagram"/>
            <text-field option="url" title="twitter" v-model="store.registro.twitter"/>
            <div class="col-span-4">
                <text-field option="file" title="foto" v-model="store.registro.imagen"/>
            </div>
            <div class="col-span-4">
                
            </div>
            <div class="col-span-2 flex justify-start">
                <btn text="Cancelar" icon="x" class="bg-red-600 text-white"/>
            </div>
            <div class="col-span-2 flex justify-end">
                <btn text="Guardar" icon="save" class="bg-green-600 text-white"
                @click="store.update()" :loading="store.btn_editar"/>
            </div>
        </div>
        <div v-else>
            <Loading />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useChicaStore } from '@/stores/chica';
import { useStores } from '@/stores';
import { useRoute, onBeforeRouteLeave } from 'vue-router'
const store = useChicaStore();
const route = useRoute();
const { global, astrologia, cabello, etnia, nacionalidad, lugarnac } = useStores();
const breadcrumbs = [
  { name: 'Home', path: '/', icon: 'fas fa-home' },
  { name: 'Persona', path: '/persona'},
  { name: 'Chicas', path: '/persona/chicas' },
  { name: 'Editar', path: ''}
];
onMounted(() => {
    store.id = route.params.id;
    store.show();
});

watch(() => store.loading_registro, (newX) => {
    if (newX) {
        etnia.getEtnia();
        nacionalidad.getNacionalidad();
        cabello.getCabello();
        astrologia.getAstrologia();
        lugarnac.getLugarnac();
    }
});
</script>

<style scoped>

</style>