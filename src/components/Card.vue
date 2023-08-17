<script setup>
    const props = defineProps([''])
</script>

<template>
    <div class="border-2 rounded-lg shadow-lg bg-white">
    
        <header v-if="props.header" class="py-3 px-6 border-b border-gray-300">
            <slot name="header"></slot>
        </header>
    
        <div class="p-4">
            <slot></slot>    
        </div>
    
        <footer  v-if="props.footer" class="py-3 px-6 border-t border-gray-300 text-gray-600">
            <slot name="footer"></slot>
        </footer>
    
    
    </div>
</template>

