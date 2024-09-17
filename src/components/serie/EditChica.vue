<template>
    <modal :open="store.isEdit" title="Editar" icon="pen-to-square" class="w-5/6">
        <div class="grid grid-cols-4 gap-3">
            <text-field title="Nombre" option="label" v-model="store.onechica.nombre" />
            <text-field title="etnia" option="select" 
                        name="nombre" values="id_etnia" :datos="etniaStore.etnias" v-model="store.onechica.etnia_id" />
            <text-field title="nacionalidad" option="select" 
                        name="nombre" values="id_nacionalidad" :datos="nacionalidadStore.nacionalidades" v-model="store.onechica.nacionalidad_id" />
            <text-field title="cabello" option="select" 
                        name="nombre" values="id_cabello" :datos="cabelloStore.cabellos" v-model="store.onechica.cabello_id" />
            <text-field title="altura" type="number" min="80" option="label" v-model="store.onechica.altura" />
            <text-field title="peso" type="number" min="50" option="label" v-model="store.onechica.peso" />
            <text-field title="medidas" option="label" v-model="store.onechica.medidas" />
            <text-field title="alias" option="label" v-model="store.onechica.alias" />
            <text-field title="tatuajes" option="label" v-model="store.onechica.tatuajes" />
            <text-field title="piercing" option="label" v-model="store.onechica.piercing" />
            <text-field title="lugar nacimiento" option="select" v-model="store.onechica.lugarnac_id" 
                        name="nombre" values="id_lugarnac" :datos="lugarnacStore.lugarnac"/>
            <text-field title="astrologia" option="select" v-model="store.onechica.astrologia_id" 
                        name="nombre" values="id_astrologia" :datos="astrologiaStore.astrologias"/>
            <div class="col-span-2">
                <text-field title="fecha de nacimiento" type="date" option="label" v-model="store.onechica.fechanac" />
            </div>
            <text-field title="fecha comienzo" type="date" option="label" v-model="store.onechica.comienzo" />
            <text-field title="fecha fin" type="date" option="label" v-model="store.onechica.fin" />
            <div class="col-span-2">
                <text-field title="instagram" option="label" type="url" v-model="store.onechica.instagram"  />
            </div>
            <div class="col-span-2">
                <text-field title="twitter" option="label" type="url" v-model="store.onechica.twitter" class="col-span-2" />
            </div>
            <div class="col-span-4">
                <text-field title="foto" option="label" type="url" v-model="store.onechica.foto" />
            </div>      
        </div>
        <div class="flex items-center justify-center" v-if="store.onechica.foto">
            <img :src="store.onechica.foto" :alt="store.onechica.nombre" class="h-40">
        </div>
        <template #footer>
            <btn text="Guardar" icon="save" class="bg-green-500 text-white p-4 font-bold"
                @click="store.UpdatedChica()" :loading="store.loading_update"/>
            <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold"
                @click="store.isEdit = false" />
        </template>
    </modal>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useChicaStore } from '@/stores/chica';
import { useEtniaStore } from '../../stores/etnia';
import { useNacionalidadStore } from '../../stores/nacionalidad';
import { useCabelloStore } from '../../stores/cabello';
import { useAstrologiaStore } from '../../stores/astrologia';
import { useLugarnacStore } from '../../stores/lugarnac';
const store = useChicaStore();
const etniaStore = useEtniaStore();
const nacionalidadStore = useNacionalidadStore();
const cabelloStore = useCabelloStore();
const astrologiaStore = useAstrologiaStore();
const lugarnacStore = useLugarnacStore();
onBeforeMount(() => {
    // etniaStore.getEtnia();  
    // nacionalidadStore.getNacionalidad();
    // cabelloStore.getCabello();
    // astrologiaStore.getAstrologia();
    // lugarnacStore.getLugarnac();
});
</script>