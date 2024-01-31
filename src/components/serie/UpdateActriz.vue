<template>
    <modal :open="actrizStore.isEdit" title="Editar" icon="pen-to-square">
           
        <div class="grid grid-cols-4 gap-2">
            <img :src="actrizStore.oneactriz.FOTO_ACTRIZ" :alt="actrizStore.oneactriz.NOMBRE_ACTRIZ" srcset=""
                class="row-span-4">
            <div class="mt-7">
                <textfield title="NOMBRE" option="label" v-model="actrizStore.oneactriz.NOMBRE_ACTRIZ" />
            </div>
            <div class="relative mb-3 mt-7">
                <input type="date" v-model="actrizStore.oneactriz.FECHANAC_ACTRIZ" class="w-full h-[58px] peer m-0 block rounded border-2 focus-within:border-blue-400
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
            <div class="mt-7">
                <selectfield v-model="actrizStore.oneactriz.ID_ASTROLOGIA" :options="astrologiaStore.astrologias"
                    title="ASTROLOGIA" displayField="NOMBRE_ASTROLOGIA" valueField="ID_ASTROLOGIA" />
            </div>
            <textfield title="ALTURA" option="label" v-model="actrizStore.oneactriz.ALTURA_ACTRIZ" />
            <textfield title="INSTAGRAM" option="label" v-model="actrizStore.oneactriz.INSTAGRAM_ACTRIZ" />
            <textfield title="TWITTER" option="label" v-model="actrizStore.oneactriz.TWITTER_ACTRIZ" />
            <selectfield v-model="actrizStore.oneactriz.ID_CABELLO" :options="cabelloStore.cabellos" title="CABELLO"
                displayField="NOMBRE_CABELLO" valueField="ID_CABELLO" />
            <selectfield v-model="actrizStore.oneactriz.ID_ETNIA" :options="etniaStore.etnias" title="ETNIA"
                displayField="NOMBRE_ETNIA" valueField="ID_ETNIA" />
            <selectfield v-model="actrizStore.oneactriz.ID_NACIONALIDAD" :options="nacionalidadStore.nacionalidades"
                title="NACIONALIDAD" displayField="NOMBRE_NACIONALIDAD" valueField="ID_NACIONALIDAD" />
            <selectfield v-model="actrizStore.oneactriz.ID_LUGARNAC" :options="lugarnacStore.lugarnacimiento"
                title="LUGAR NACIMIENTO" displayField="NOMBRE_LUGARNAC" valueField="ID_LUGARNAC" />
            <selectfield v-model="actrizStore.oneactriz.ID_BUSTO" :options="bustoStore.bustos"
                title="BUSTO" displayField="BUSTO" valueField="ID_BUSTO" />
            <selectfield v-model="actrizStore.oneactriz.ID_GLUTEO" :options="gluteoStore.gluteos"
                title="GLUTEO" displayField="GLUTEO" valueField="ID_GLUTEO" />
            <div>{{actrizStore.oneactriz.LUGARNAC_ACTRIZ}}</div>
            <textfield title="GLUTEOS" option="label" v-model="actrizStore.oneactriz.IMGGLUTEO_ACTRIZ" class="col-span-2" />
            <textfield title="BUSTO" option="label" v-model="actrizStore.oneactriz.IMGBUSTO_ACTRIZ" class="col-span-2" />
            <textfield title="IMAGEN" option="label" v-model="actrizStore.oneactriz.FOTO_ACTRIZ" class="col-span-2" />
        </div>
        <template #footer>
            <button @click="actrizStore.UpdatedActriz()" class="bg-green-400 p-3 text-white rounded-xl mr-auto">Guardar</button>
            <button @click="actrizStore.isEdit = false" class="bg-red-400 p-3 text-white rounded-xl">Cerrar</button>
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
import { useBustoStore } from '../../stores/busto';
import { useGluteoStore } from '../../stores/gluteo';
const actrizStore = useActrizStore();
  const astrologiaStore = useAstrologiaStore();
  const cabelloStore = useCabelloStore();
  const etniaStore = useEtniaStore();
  const nacionalidadStore = useNacionalidadStore();
  const lugarnacStore = useLugarnacStore();
  const bustoStore = useBustoStore();
  const gluteoStore = useGluteoStore();
</script>