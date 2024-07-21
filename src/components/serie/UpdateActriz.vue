<template>
    <modal :open="store.opcion_editar" title="Editar" icon="pen-to-square" class="w-2/3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <text-field title="NOMBRE" option="label" v-model="store.oneactriz.nombre" />
            <div class="relative">
                <input type="date" v-model="store.oneactriz.fechanac" class="w-full h-[58px] peer m-0 block rounded border-2 focus-within:border-blue-400
                             bg-white bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight
                            text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent 
                            focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 
                            focus:outline-none peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] 
                            [&:not(:placeholder-shown)]:pt-[1.625rem]" />
                <label
                    class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent 
                    px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 
                    ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] 
                    peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 
                    peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] 
                    motion-reduce:transition-none uppercase truncate">
                    FECHA DE NACIMIENTO
                </label>
            </div>
            <div class="flex justify-center row-span-3">
                <img :src="store.oneactriz.foto" :alt="store.oneactriz.nombre" srcset="">
            </div>
            <text-field title="INSTAGRAM" option="label" v-model="store.oneactriz.instagram" />
            <text-field title="TWITTER" option="label" v-model="store.oneactriz.twitter" />
            <text-field title="ALTURA" option="label" v-model="store.oneactriz.altura" />
            <text-field v-model="store.oneactriz.astrologia_id" :datos="astrologia.astrologias" option="select" title="ASTROLOGIA" name="nombre" values="id_astrologia"/>
            <text-field v-model="store.oneactriz.cabello_id" :datos="cabello.cabellos" option="select" title="CABELLO"  name="nombre" values="id_cabello" />
            <text-field v-model="store.oneactriz.etnia_id" :datos="etnia.etnias" option="select" title="ETNIA"  name="nombre" values="id_etnia"/>
            <text-field v-model="store.oneactriz.nacionalidad_id" :datos="nacionalidad.nacionalidades" option="select" title="nacionalidad"  name="nombre" values="id_nacionalidad"/>
            <text-field v-model="store.oneactriz.lugarnac_id" :datos="lugarnac.lugarnac" option="select" title="Lugar de nacimiento"  name="nombre" values="id_lugarnac"/>
            <text-field v-model="store.oneactriz.gluteo_id" :datos="datos" option="select" title="gluteos"  name="name" values="id"/>
            <text-field v-model="store.oneactriz.busto_id" :datos="datos" option="select" title="busto"  name="name" values="id"/>
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