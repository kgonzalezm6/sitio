<template>
    <div>
        <modal :open="store.opcion_nuevo" title="NUEVO" icon="user" class="w-2/3">
        <div>
            <text-field option="label" title="nombre" />
        </div>
        <template #footer>
            <div class="ml-auto">
                <btn text="Cerrar" class="bg-red-500 text-white"/>
            </div>
        </template>
        </modal>
    </div>
</template>

<script setup>
    import { useEtniaStore } from '../../stores/etnia';

    const store = useEtniaStore();
</script>

<style lang="scss" scoped>

</style>