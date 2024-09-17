<template>
    <div>
        <modal :open="store.option_crear" title="Crear" icon="pen-to-square" class="w-2/3">
            <div class="grid grid-cols-2 gap-3 mt-4">
                <text-field title="Nombre" option="label" v-model="store.nombre" />
                <text-field title="fecha" option="date" v-model="store.fecha" />
                <text-field title="sitio" option="label" v-model="store.sitio" />
                <v-select :options="store.estados"  
                    append-to-body class="border border-gray-300 rounded-md p-2 w-full peer"
                    label="nombre" :reduce="item => item.id"
                    v-model="store.estado"/>
                <v-select :options="store.visualizaciones"  
                    append-to-body class="border border-gray-300 rounded-md p-2 w-full peer"
                    label="nombre" :reduce="item => item.id"
                    v-model="store.visualizacion"/>
                <text-field title="foto" option="label" v-model="store.imagen" />

                <div class="col-span-2 flex justify-center items-center">
                    <img :src="store.imagen" :alt="store.nombre" class="h-48">
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
    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        store.setFile(index, file);
    };

    const handleNameChange = (event, index) => {
        const name = event.target.value;
        store.setName(index, name);
    };
    const handleSubmit = async () => {
    try {
        await store.uploadFiles();
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};
</script>

<style lang="css" scoped>

</style>