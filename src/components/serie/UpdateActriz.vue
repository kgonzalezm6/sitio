<template>
    <modal :open="store.opcion_editar" title="Editar" icon="pen-to-square" class="w-5/6">
        <div class="grid gap-4 mt-4">
            <text-field title="NOMBRE" option="label" v-model="store.oneactriz.nombre" />
            <text-field title="FECHA DE NACIMIENTO" option="date" v-model="store.oneactriz.fechanac"/>
            <div class="flex justify-center row-span-3">
                <img :src="store.oneactriz.foto" :alt="store.oneactriz.nombre" srcset="">
            </div>
            <text-field title="INSTAGRAM" option="label" v-model="store.oneactriz.instagram" />
            <text-field title="TWITTER" option="label" v-model="store.oneactriz.twitter" />
            <text-field title="ALTURA" option="label" v-model="store.oneactriz.altura" />
            <v-select :options="astrologia.astrologias"  
                append-to-body class="border border-gray-300 rounded-md"
                label="nombre" :reduce="item => item.id_astrologia"
                v-model="store.oneactriz.astrologia_id"/>
            <v-select :options="cabello.cabellos"  
                append-to-body class="border border-gray-300 rounded-md p-2 w-full peer"
                label="nombre" :reduce="item => item.id_cabello"
                v-model="store.oneactriz.cabello_id"/>
            <v-select :options="etnia.etnias"  
                append-to-body class="border border-gray-300 rounded-md p-2 w-full peer"
                label="nombre" :reduce="item => item.id_etnia"
                v-model="store.oneactriz.etnia_id"/>
            <v-select :options="nacionalidad.nacionalidades"  
                append-to-body class="border border-gray-300 rounded-md p-2 w-full peer"
                label="nombre" :reduce="item => item.id_nacionalidad"
                v-model="store.oneactriz.nacionalidad_id"/>
            <v-select :options="lugarnac.lugarnac"  
                append-to-body class="border border-gray-300 rounded-md p-2 w-full peer"
                label="nombre" :reduce="item => item.id_lugarnac"
                title="lugarnac"
                v-model="store.oneactriz.lugarnac_id"/>
            <text-field title="BUSTO" option="label" v-model="store.oneactriz.busto" />
            <text-field title="gluteo" option="label" v-model="store.oneactriz.gluteo"/>
            <text-field title="foto" option="label" v-model="store.oneactriz.foto"/>
            <img :src="store.oneactriz.busto" :alt="store.oneactriz.nombre" srcset="">
            <img :src="store.oneactriz.gluteo" :alt="store.oneactriz.nombre" srcset="">
            <div>{{store.oneactriz.LUGARNAC_ACTRIZ}}</div>
            <div class="col-span-3">
                <validate-errors :errors="store.errors" v-if="store.errors != 0" />
            </div>
        </div> 
        <template #footer>
            <button @click="store.UpdatedActriz()" :loading="store.loading_update" class="bg-green-400 p-3 text-white rounded-xl mr-auto font-bold">Guardar</button>
            <button @click="store.opcion_editar = false" class="bg-red-400 p-3 text-white rounded-xl font-bold">Cerrar</button>
        </template>
    </modal>
</template>
<script setup>
import { useActrizStore } from '../../stores/actriz';
import { useAstrologiaStore } from '../../stores/astrologia';
import { useCabelloStore } from '../../stores/cabello';
import { useEtniaStore } from '../../stores/etnia';
import { useNacionalidadStore } from '../../stores/nacionalidad';
import { useLugarnacStore } from '../../stores/lugarnac';
  const store = useActrizStore();
  const astrologia = useAstrologiaStore();
  const cabello = useCabelloStore();
  const etnia = useEtniaStore();
  const nacionalidad = useNacionalidadStore();
  const lugarnac = useLugarnacStore();
  const datos = [
  {id:1,name:'SI'},
  {id:2, name:'NO'}
  ];
</script>