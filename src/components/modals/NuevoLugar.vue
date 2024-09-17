<template>
    <div>
        <modal :open="store.opcion_nuevo" title="NUEVO LUGAR" icon="user" class="w-2/3">
        <div>
            <div class="my-10">
                <text-field option="label" title="nombre" v-model="store.nombre"/>
            </div>
            <validate-errors :errors="store.error" v-if="store.error != 0" />
        </div>
        <template #footer>           
            <div >
                <btn text="Cerrar" class="bg-red-500 text-white" @click="store.opcion_nuevo = false, error.value = []"/>
            </div>
            <div class="ml-auto">
                <btn text="Guardar" class="bg-green-500 text-white" @click="store.CreateLugarnac()"/>
            </div>
        </template>
        </modal>
    </div>
</template>

<script setup>
    import { useLugarnacStore } from '../../stores/lugarnac';

    const store = useLugarnacStore();
</script>

<style lang="css" scoped>

</style>
