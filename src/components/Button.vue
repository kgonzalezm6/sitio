<script setup>
    import spiner from '../components/Spiner.vue'
    const props = defineProps({
        text : '',
        icon : '',
        loading : {
            default : false
        },
        type : {
           default : 'normal' 
        },
        color : {
           default : 'blue-500' 
        }
    });
</script>

<template>
    <div v-if="props.type == 'normal'">
        <button class="btn "  :disabled="props.loading">
            <div class="flex items-center space-x-2">
                <Icon :icon="props.icon" class="text-base"/>
                <small>
                    {{ text }}
                </small>
                <spiner v-if="props.loading" class="border-b-gray-700 h-4 " />
            </div>
        </button>
    </div>
    <div v-else-if="props.type == 'circulo'" class="group relative">
        <button class="h-12 w-12 rounded-full" :class="'bg-'+props.color, 'shadow-'+props.color" :disabled="props.loading">
            <Icon :icon="props.icon" class="group-hover:text-white group-hover:scale-110"/>
            <spiner v-if="props.loading" class="border-b-gray-700 h-4 " />
        </button>
            <span class="absolute -top-14 left-[50%] -translate-x-[50%] 
            z-20 origin-left scale-0 px-3 rounded-lg border 
            border-gray-300 bg-white py-2 text-sm font-bold
            shadow-md transition-all duration-300 ease-in-out 
            group-hover:scale-100 whitespace-nowrap text-blue-600">{{ text }}
            <span>

        </span>
        </span>
    </div>
</template>