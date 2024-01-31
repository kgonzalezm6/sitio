<template>
    <modal :open="chicaStore.isNew" title="Nuevo" icon="plus" class="w-2/3">
        <div class="grid grid-cols-4 gap-3">
            <text-field title="Nombre" option="label" v-model="chicaStore.chica.NOMBRE_CHICA" />

            <text-field title="etnia" option="select" name="NOMBRE_ETNIA" values="ID_ETNIA" :datos="etniaStore.etnias"
                v-model="chicaStore.chica.ID_ETNIA" />
            <text-field title="nacionalidad" option="select" name="NOMBRE_NACIONALIDAD" values="ID_NACIONALIDAD"
                :datos="nacionalidadStore.nacionalidades" v-model="chicaStore.chica.ID_NACIONALIDAD" />
            <text-field title="cabello" option="select" name="NOMBRE_CABELLO" values="ID_CABELLO"
                :datos="cabelloStore.cabellos" v-model="chicaStore.chica.ID_CABELLO" />
            <text-field title="altura" type="number" min="80" option="label" v-model="chicaStore.chica.ALTURA_CHICA" />
            <text-field title="peso" type="number" min="50" option="label" v-model="chicaStore.chica.PESO_CHICA" />
            <text-field title="medidas" option="label" v-model="chicaStore.chica.MEDIDAS_CHICA" />
            <text-field title="tatuajes" option="label" v-model="chicaStore.chica.TATUAJES_CHICA" />
            <text-field title="piercing" option="label" v-model="chicaStore.chica.PIERCING_CHICA" />
            <text-field title="alias" option="label" v-model="chicaStore.chica.ALIAS_CHICA" />
            <div class="col-span-2">
                <text-field title="fecha de nacimiento" type="date" option="label"
                    v-model="chicaStore.chica.FECHANAC_CHICA" />
            </div>
            <text-field title="astrologia" option="select" v-model="chicaStore.chica.ID_ASTROLOGIA" name="NOMBRE_ASTROLOGIA"
                values="ID_ASTROLOGIA" :datos="astrologiaStore.astrologias" />
            <text-field title="lugar nacimiento" option="select" v-model="chicaStore.chica.ID_LUGARNAC"
                name="NOMBRE_LUGARNAC" values="ID_LUGARNAC" :datos="lugarnacStore.lugarnacimiento" />
            <div class="relative mb-3">
                <datepicker year-picker :year-range="[1995, 2040]"
                    class="w-full peer m-0 block h-[58px] bg-white rounded border-2 focus-within:border-blue-400 
                    bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 
                    transition duration-200 ease-linear placeholder:text-transparent focus:border-primary 
                    focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none 
                    peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                    v-model="chicaStore.chica.COMIENZO_CHICA">
                </datepicker>
                <label
                    class="truncate pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
                    FECHA COMIENZO
                </label>
            </div>
            <div class="relative mb-3">
                <datepicker year-picker :year-range="[2000, 2060]"
                    class="w-full peer m-0 block h-[58px] bg-white rounded border-2 focus-within:border-blue-400 
                    bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 
                    transition duration-200 ease-linear placeholder:text-transparent focus:border-primary 
                    focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none 
                    peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                    v-model="chicaStore.chica.FIN_CHICA">
                </datepicker>
                <label
                    class="truncate pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
                    FECHA FIN
                </label>
            </div>
            <!-- <text-field title="fecha comienzo" type="date" option="label" v-model="chicaStore.chica.COMIENZO_CHICA" />
            <text-field title="fecha fin" type="date" option="label" v-model="chicaStore.chica.FIN_CHICA" /> -->

            <div class="col-span-2">
                <text-field title="instagram" option="label" type="url" v-model="chicaStore.chica.INSTAGRAM_CHICA" />
            </div>
            <div class="col-span-2">
                <text-field title="twitter" option="label" type="url" v-model="chicaStore.chica.TWITTER_CHICA"
                    class="col-span-2" />
            </div>
            <div class="col-span-4">
                <text-field title="foto" option="label" type="url" v-model="chicaStore.chica.FOTO_CHICA" />
            </div>

        </div>
        <div class="flex items-center justify-center" v-if="chicaStore.chica.FOTO_CHICA">
            <img :src="chicaStore.chica.FOTO_CHICA" :alt="chicaStore.chica.NOMBRE_CHICA">
        </div>
        <template #footer>
            <btn text="Guardar" icon="save" class="bg-green-500 text-white p-4 font-bold"
                @click="chicaStore.CreateChica()" />
            <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold" @click="chicaStore.isNew = false" />
        </template>
    </modal>
</template>
<script setup>
import { onBeforeMount, ref, watchEffect } from 'vue';
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