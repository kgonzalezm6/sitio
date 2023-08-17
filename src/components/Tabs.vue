<script setup>
    const props = defineProps(['tabs'])
</script>

<template>
    
    <nav class="w-full border-b-2 border-lime-500">
        <ul class="flex justify-center items-center space-x-6 text-xl font-bold text-lime-600">
            <li v-for="tab in tabs">
                <RouterLink 
                    class="block cursor-pointer hover:border-b-white rounded-t-lg border-2 border-lime-500  px-3 py-2 -m-0.5" 
                    active-class="border-b-white bg-lime-50" 
                    :to="{ 'name': tab }">
                    {{ tab }}
                </RouterLink>
            </li>
        </ul>
    </nav>
    <div >
        <RouterView />
    </div>
</template>
