<template>
    <div>
        <div class="tabs-container bg-blue-500 p-2 rounded-lg text-center rounded-bl-full rounded-tr-full">
            <div v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)"
                :class="{ 'text-white font-bold border-b-2 border-white': activeTab === index, 'text-gray-300': activeTab !== index }"
                class="cursor-pointer py-2 px-4 inline-block">
                {{ tab }}
            </div>
        </div>

        <div class="mt-4">
            <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
                <slot :name="`tab-${index}`"></slot>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['tabs']);
const activeTab = ref(0);

const changeTab = (index) => {
    activeTab.value = index;
};
</script>
  
  
  
  