<script setup>
    const props = defineProps(['message'])
</script>

<template>
    <div class="flex space-x-2 has-nuve cursor-pointer justify-center">
        <span class = 'nuve font-bold text-center bg-white mx-auto rounded-md border-2 p-2 shadow-lg -mt-14'>
            {{ message }}
        </span>
        <slot></slot>
    </div>

</template>

<style>
    .nuve {
        @apply invisible absolute;
    }

    .has-nuve:hover .nuve {
        @apply visible z-30;
    }
</style>