<script setup>
    const props = defineProps(['open','class'])
</script>

<template>
    <Transition>
        <div v-show="props.open" class ='inset-0 fixed h-screen bg-gray-900 bg-opacity-40 z-30 overflow-y-auto'>
            <div  class="relative flex justify-center mt-6">
                <div class = "bg-white mx-4 max-w-4xl min-w-min rounded-lg shadow-lg border-2 overflow-hidden p-2" :class="props.class ?? ''">
                    <header class=" border-b-2 p-2 flex justify-between items-start">
                        <h1 class="text-3xl font-bold text-gray-500">
                            <slot name="header"></slot>
                        </h1>                
                    </header>
                    <section class="py-4 px-4">
                        <slot></slot>
                    </section>
                    <footer class= "border-t-2 text-right p-4 flex justify-between">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
    .v-enter-active, .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from, .v-leave-to {
        opacity: 0;
    }
</style>