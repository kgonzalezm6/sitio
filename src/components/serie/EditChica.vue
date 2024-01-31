<template>
    <modal :open="chicaStore.isEdit" title="Editar" icon="pen-to-square" class="w-2/3">
        <div class="grid grid-cols-4 gap-3">
            <text-field title="Nombre" option="label" v-model="chicaStore.onechica.NOMBRE_CHICA" />
            
            <text-field title="etnia" option="select" 
                        name="NOMBRE_ETNIA" values="ID_ETNIA" :datos="etniaStore.etnias" v-model="chicaStore.onechica.ID_ETNIA" />
            <text-field title="nacionalidad" option="select" 
                        name="NOMBRE_NACIONALIDAD" values="ID_NACIONALIDAD" :datos="nacionalidadStore.nacionalidades" v-model="chicaStore.onechica.ID_NACIONALIDAD" />
            <text-field title="cabello" option="select" 
                        name="NOMBRE_CABELLO" values="ID_CABELLO" :datos="cabelloStore.cabellos" v-model="chicaStore.onechica.ID_CABELLO" />
            <text-field title="altura" type="number" min="80" option="label" v-model="chicaStore.onechica.ALTURA_CHICA" />
            <text-field title="peso" type="number" min="50" option="label" v-model="chicaStore.onechica.PESO_CHICA" />
            <text-field title="medidas" option="label" v-model="chicaStore.onechica.MEDIDAS_CHICA" />
            <text-field title="alias" option="label" v-model="chicaStore.onechica.ALIAS_CHICA" />
            <text-field title="tatuajes" option="label" v-model="chicaStore.onechica.TATUAJES_CHICA" />
            <text-field title="piercing" option="label" v-model="chicaStore.onechica.PIERCING_CHICA" />
            <text-field title="lugar nacimiento" option="select" v-model="chicaStore.onechica.ID_LUGARNAC" 
                        name="NOMBRE_LUGARNAC" values="ID_LUGARNAC" :datos="lugarnacStore.lugarnacimiento"/>
            <text-field title="astrologia" option="select" v-model="chicaStore.onechica.ID_ASTROLOGIA" 
                        name="NOMBRE_ASTROLOGIA" values="ID_ASTROLOGIA" :datos="astrologiaStore.astrologias"/>
            <div class="col-span-2">
                <text-field title="fecha de nacimiento" type="date" option="label" v-model="chicaStore.onechica.FECHANAC_CHICA" />
            </div>
            <text-field title="fecha comienzo" type="date" option="label" v-model="chicaStore.onechica.COMIENZO_CHICA" />
            <text-field title="fecha fin" type="date" option="label" v-model="chicaStore.onechica.FIN_CHICA" />
            <div class="col-span-2">
                <text-field title="instagram" option="label" type="url" v-model="chicaStore.onechica.INSTAGRAM_CHICA"  />
            </div>
            <div class="col-span-2">
                <text-field title="twitter" option="label" type="url" v-model="chicaStore.onechica.TWITTER_CHICA" class="col-span-2" />
            </div>
            <div class="col-span-4">
                <text-field title="foto" option="label" type="url" v-model="chicaStore.onechica.FOTO_CHICA" />
            </div>
            
        </div>
        <div class="flex items-center justify-center" v-if="chicaStore.onechica.FOTO_CHICA">
            <img :src="chicaStore.onechica.FOTO_CHICA" :alt="chicaStore.onechica.NOMBRE_CHICA">
        </div>
        <template #footer>
            <btn text="Guardar" icon="save" class="bg-green-500 text-white p-4 font-bold"
                @click="chicaStore.UpdatedChica()" />
            <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold"
                @click="chicaStore.isNew = false" />
        </template>
    </modal>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useChicaStore } from '../../stores/chica';
import { useEtniaStore } from '../../stores/etnia';
import { useNacionalidadStore } from '../../stores/nacionalidad';
import { useCabelloStore } from '../../stores/cabello';
import { useAstrologiaStore } from '../../stores/astrologia';
import { useLugarnacStore } from '../../stores/lugarnac';
const chicaStore = useChicaStore();
const etniaStore = useEtniaStore();
const nacionalidadStore = useNacionalidadStore();
const cabelloStore = useCabelloStore();
const astrologiaStore = useAstrologiaStore();
const lugarnacStore = useLugarnacStore();
onBeforeMount(() => {
    etniaStore.getEtnia();  
    nacionalidadStore.getNacionalidad();
    cabelloStore.getCabello();
    astrologiaStore.getAstrologia();
    lugarnacStore.getLugarnac();
});
</script>