<script setup>
    import spiner from '../components/Spiner.vue'
    const props = defineProps({
        text : '',
        icon : '',
        loading : {
            default : false
        }
    })
</script>

<template>
    <button class="btn "  :disabled="props.loading">
        <div class="flex items-center space-x-1">
            <icon v-if="props.icon" :icon="icon"/>
            <small>
                {{ text }}
            </small>
            <spiner v-if="props.loading" class="border-b-gray-700 h-4 " />
        </div>
    </button>
</template>