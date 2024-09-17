<template>
    <div>
                    <div class="flex justify-center">
                            <button class="bg-green-muni h-14 w-14 rounded-full border-2 border-green-400 my-5
                            hover:bg-green-700" @click="store.opcion_nuevo = true">
                                <Icon icon="plus" class="text-white"/>
                            </button>
                    </div>
                    <datatable :data="store.etnias" :headers="store.headers" :loading="store.loading_etnias">
                        <template #estado="{ item }">
                            <span class="px-2 py-1 text-white rounded-full"
                                :class="[item.estado ? 'bg-green-400' : 'bg-red-400']">{{ item.estado ? 'Activo' :
                                    'Inactivo' }}</span>
                        </template>
                        <template #actions="{ item }">
                            <Icon icon="pen-to-square" @click="store.open(item, 1)"
                                class="text-3xl text-cyan-500 hover:scale-125 mr-2 " />
                            <Icon icon="trash" @click="store.open(item, 3)" 
                            class="text-3xl text-red-500 hover:scale-125" />
                        </template>
                    </datatable>
            <Nuevo />
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useEtniaStore } from '../../stores/etnia';
    import Nuevo from './NuevaEtnia.vue'
    const store = useEtniaStore();

    onMounted(() => {
        store.getEtnia();
    });
</script>

<style lang="scss" scoped>

</style>