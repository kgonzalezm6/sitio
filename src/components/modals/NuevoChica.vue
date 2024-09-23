<template>
    <div>
        <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10"/>
        <div class="shadow-all w-full bg-white grid sm:grid-cols-2 md:grid-cols-4 gap-2 p-6 rounded-xl mb-10">
            <div class="col-span-2">
                <text-field option="label" title="nombre" v-model="store.nuevo.nombre"/>
            </div>
            <Autocomplete v-model="store.nuevo.etnia" title="etnia" :options="etnia.etnias" labelKey="nombre" returnKey="id_etnia" :loading="etnia.loading_etnias"/>
            <Autocomplete v-model="store.nuevo.nacionalidad" title="nacionalidad" :options="nacionalidad.nacionalidades" labelKey="nombre" returnKey="id_nacionalidad" :loading="nacionalidad.loading_nacionalidades"/>
            <Autocomplete v-model="store.nuevo.cabello" title="color de cabello" :options="cabello.cabellos" labelKey="nombre" returnKey="id_cabello" :loading="cabello.loading_cabellos"/>
            <text-field option="numeric" title="alto" v-model="store.nuevo.alto"/>
            <text-field option="numeric" title="peso" v-model="store.nuevo.peso"/>
            <text-field option="label" title="medidas" v-model="store.nuevo.medidas"/>
            <div class="col-span-2">
                <text-field option="label" title="tatuajes" v-model="store.nuevo.tatuajes"/>
            </div>
            <div class="col-span-2">
                <text-field option="label" title="piercing" v-model="store.nuevo.piercing"/>
            </div>
            <text-field option="label" title="alias" v-model="store.nuevo.alias"/>
            <text-field option="date" title="fecha de nacimiento" v-model="store.nuevo.fechanac"/>
            <Autocomplete title="Astrologia" v-model="store.nuevo.astrologia" :options="astrologia.astrologias" labelKey="nombre" returnKey="id_astrologia" :loading="astrologia.loading_astrologias"/>
            <Autocomplete title="Lugar de nacimiento" v-model="store.nuevo.lugarnac" :options="lugarnac.lugarnac" labelKey="nombre" returnKey="id_lugarnac" :loading="lugarnac.loading_lugarnac"/>
            <text-field option="year" title="comienzo" v-model="store.nuevo.comienzo"/>
            <text-field option="year" title="final" v-model="store.nuevo.final"/>
            <text-field option="url" title="instagram" v-model="store.nuevo.instagram"/>
            <text-field option="url" title="twitter" v-model="store.nuevo.twitter"/>
            <div class="col-span-4">
                <text-field option="file" title="foto" v-model="store.nuevo.imagen"/>
            </div>
            <div class="col-span-2">
                <btn text="Cancelar" class="bg-red-600 text-white"/>
            </div>
            <div class="col-span-2 flex justify-end">
                <btn text="Guardar" class="bg-green-600 text-white"
                @click="store.store()" :loading="store.btn_nuevo"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useChicaStore } from '@/stores/chica';
import { useStores } from '@/stores';

const store = useChicaStore();
const { global, astrologia, cabello, etnia, nacionalidad, lugarnac } = useStores();

const name = store.nuevo.nombre;
const breadcrumbs = [
  { name: 'Home', path: '/', icon: 'fas fa-home' },
  { name: 'Persona', path: '/persona'},
  { name: 'Chicas', path: '/persona/chicas' },
  { name: 'Nuevo', path: ''}
];


onMounted(() => {
    etnia.getEtnia();
    nacionalidad.getNacionalidad();
    cabello.getCabello();
    astrologia.getAstrologia();
    lugarnac.getLugarnac();
});
</script>

<style scoped>

</style>