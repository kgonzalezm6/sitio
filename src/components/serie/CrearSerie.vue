<template>
    <div>
        <modal :open="store.option_crear" title="Crear" icon="pen-to-square" class="w-2/3">
            <div class="grid grid-cols-2 gap-3">
                <text-field title="Nombre" option="label" v-model="store.serie.nombre" />
                <text-field type="date" title="fecha" option="label" v-model="store.serie.fecha" />
                <text-field title="sitio" option="label" v-model="store.serie.sitio" />
                <div class="relative mb-3">
                    <select v-model="store.serie.estado" class="w-full peer m-0 block h-[58px] bg-white rounded border-2 focus-within:border-blue-400 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none 
                    peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]">
                        <option disabled>SELECCIONE</option>
                        <option v-for="i in store.estado" :value="i.id"> {{i.nombre}}</option>
                    </select>
                    <label
                    class="truncate pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
                    estado
                    </label>
                </div>
                <div class="relative mb-3">
                    <select v-model="store.serie.visualizacion" class="w-full peer m-0 block h-[58px] bg-white rounded border-2 focus-within:border-blue-400 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none 
                    peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]">
                        <option disabled>SELECCIONE</option>
                        <option v-for="i in store.visualizacion" :value="i.id"> {{i.nombre}}</option>
                    </select>
                    <label
                    class="truncate pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
                    visualizacion
                    </label>
                </div>
                <text-field title="foto" option="label" v-model="store.serie.imagen" />
                <div class="col-span-2 flex justify-center items-center">
                    <img :src="store.serie.imagen" :alt="store.serie.nombre" class="h-48">
                  </div>
            </div>
            <validate-errors :errors="store.error" v-if="store.error!= 0"/>
            <template #footer>
                <btn text="Guardar" icon="save" class="bg-green-500 text-white p-4 font-bold"
                     @click="store.crearSerie()" :loading="store.loading_crear"/>
                <btn text="Cancelar" icon="x" class="bg-red-500 text-white p-4 font-bold"
                    @click="store.option_crear = false" />
            </template>
        </modal>
    </div>
</template>

<script setup>
    import { useSerieStore } from '@/stores/serie';

    const store = useSerieStore();
</script>

<style lang="css" scoped>

</style>