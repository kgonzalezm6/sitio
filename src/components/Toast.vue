<script setup>

    import { ref, onMounted } from 'vue'
    import { useGlobalStore } from '../stores/global'

    const store = useGlobalStore()

    const props = defineProps(['title','message','type'])
    let open = ref(true)
    
    onMounted(() => {
        setTimeout( () => {
            open.value = false
            store.setAlert('','')
        }, 4000 )        
    })


</script>

<template>
    <div 
        v-if="open"
        :class="{
            'bg-blue-500'   : type === 'primary',
            'bg-green-500'  : type === 'success',
            'bg-red-500'    : type === 'danger',
            'bg-yellow-500' : type === 'warning',
        }"
        class="fixed top-12 right-0 mt-8 mr-2 shadow-lg mx-auto w-96 max-w-full text-sm bg-clip-padding rounded-lg block mb-3 z-50 bg-opacity-80">
        
        <div class="flex font-bold text-white justify-between items-center py-2 px-3 bg-clip-padding border-b border-gray-300 rounded-t-lg ">
            
            <icon v-if="type === 'primary'" icon="fa-solid fa-circle-check" class="text-xl"/>
            <icon v-else-if="type === 'success'" icon="fa-solid fa-circle-check" class="text-xl"/>
            <icon v-else-if="type === 'danger'" icon="fa-solid fa-circle-xmark" class="text-xl"/>
            <icon v-else="type === 'warning'" icon="fa-solid fa-triangle-exclamation" class="text-xl"/>

            <p>{{ props.title }}</p>

            <button @click="open=false"> X </button>
        </div>

        <div class="p-3 rounded-b-lg break-words text-white">
            {{ props.message }}
        </div>
    </div>

</template>