<template>
    <modal :open="store.opcion_nuevo" title="Nuevo" icon="plus" class="w-5/6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            <text-field title="NOMBRE" option="label" v-model="store.actriz.nombre" :class="[store.errors.nombre ? 'border border-red-500' : 'border border-green-500']"/>
            <text-field title="FECHA DE NACIMIENTO" option="date" v-model="store.actriz.fechanac" :class="[store.errors.nombre ? 'border border-red-500' : 'border border-green-500']"/>
            <Autocomplete 
                v-model="store.actriz.astrologia_id" 
                :options="astrologia.astrologias" 
                :labelKey="'nombre'" 
                :returnKey="'id_astrologia'"
                title="Seleccione el signo"
            />
            <div class="flex justify-center row-span-3">
                <img :src="store.actriz.foto" :alt="store.actriz.nombre" srcset="">
            </div>
            <div class="md:col-span-3">
                <text-field title="FOTO" option="label" v-model="store.actriz.foto" :class="[store.errors.foto ? 'border border-red-500' : 'border border-green-500']"/>
            </div>
            <text-field title="ALTURA" option="label" v-model="store.actriz.altura" :class="[store.errors.altura ? 'border border-red-500' : 'border border-green-500']"/>
            <Autocomplete 
            v-model="store.actriz.cabello_id" 
            :options="cabello.cabellos" 
            :labelKey="'nombre'" 
            :returnKey="'id_cabello'"
            title="Seleccione el cabello"
            />
            <!-- <text-field v-model="store.actriz.etnia_id" :datos="etnia.etnias" option="select" title="ETNIA"  name="nombre" values="id_etnia" :class="[store.errors.etnia_id ? 'border border-red-500' : 'border border-green-500']"/> -->
            <Autocomplete 
            v-model="store.actriz.etnia_id" 
            :options="etnia.etnias" 
            :labelKey="'nombre'" 
            :returnKey="'id_etnia'"
            title="Seleccione la etnia"
            />
            <Autocomplete 
            v-model="store.actriz.nacionalidad_id" 
            :options="nacionalidad.nacionalidades" 
            :labelKey="'nombre'" 
            :returnKey="'id_nacionalidad'"
            title="Seleccione la nacionalidad"
            />
            <Autocomplete 
            v-model="store.actriz.lugarnac_id" 
            :options="lugarnac.lugarnac" 
            :labelKey="'nombre'" 
            :returnKey="'id_lugarnac'"
            title="Seleccione el lugar de nacimiento"
            />
            <text-field title="INSTAGRAM" option="label" v-model="store.actriz.instagram" :class="[store.errors.instagram ? 'border border-red-500' : 'border border-green-500']" />
            <text-field title="TWITTER" option="label" v-model="store.actriz.twitter" :class="[store.errors.twitter ? 'border border-red-500' : 'border border-green-500']" />
            <text-field title="BUSTO" option="label" v-model="store.actriz.busto" :class="[store.errors.busto ? 'border border-red-500' : 'border border-green-500']"/>
            <text-field title="GLUTEO" option="label" v-model="store.actriz.gluteo" :class="[store.errors.busto ? 'border border-red-500' : 'border border-green-500']"/>

            <img :src="store.actriz.busto" :alt="store.actriz.nombre" srcset="">
            <img :src="store.actriz.gluteo" :alt="store.actriz.nombre" srcset="">
            <div class="col-span-4">{{store.actriz}}</div>
            <div class="col-span-3">
                <validate-errors :errors="store.errors" v-if="store.errors != 0" />
            </div>
        </div> 

        <template #footer>
            <button @click="store.opcion_nuevo = false" class="bg-red-400 p-3 text-white rounded-xl mr-auto font-bold">Cerrar</button>
            <button @click="store.CreateActriz()" :loading="store.loading_create"  
                class="bg-green-400 p-3 text-white rounded-xl font-bold">Guardar <Icon icon="save" class="ml-2"/> </button>
        </template>
    </modal>
</template>
<script setup>
import { onMounted } from 'vue'
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
  onMounted(() => {
    astrologia.getAstrologia();
    cabello.getCabello();
    etnia.getEtnia();
    nacionalidad.getNacionalidad();
    lugarnac.getLugarnac();
  });
</script>