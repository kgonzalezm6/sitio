<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        // default: 'Escribe título'
    },
    icon: ''
});

defineOptions({
    inheritAttrs: false
});

const activeTab = ref(''); // Cambia según lo necesites

onMounted(() => {
    // Cargar la pestaña activa desde localStorage
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        activeTab.value = savedTab;
    }
});

watch(activeTab, (newTab) => {
    // Guardar la pestaña activa en localStorage cuando cambie
    localStorage.setItem('activeTab', newTab);
});
</script>

<template>
    <Transition>
        <div v-show="props.open" class="inset-0 fixed bg-gray-900 bg-opacity-40 z-30 flex items-center justify-center">
            <div class="bg-white mx-4 rounded-lg shadow-lg p-4" v-bind="$attrs">
                <header class="flex items-center gap-x-2 py-2 border-b pb-2 mb-4">
                    <Icon v-if="props.icon" :icon="props.icon" class="text-orange-500 text-2xl" />
                    <span class="text-2xl text-blue-muni font-semibold tracking-tight">{{ props.title }}</span>
                </header>
                <section class="px-4 overflow-auto h-[25rem] my-4">
                    <slot></slot>
                </section>
                <footer class="text-right flex justify-between">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </Transition>
</template>
