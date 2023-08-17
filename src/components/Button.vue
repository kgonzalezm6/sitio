<script setup>
    const props = defineProps(['text','icon'])
</script>

<template>
    <button class="btn">
        <div class="flex items-center space-x-1">
            <icon v-if="props.icon" :icon="icon"/>
            <small>
                {{ text }}
            </small>
        </div>
    </button>
</template>