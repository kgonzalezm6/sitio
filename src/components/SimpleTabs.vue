<template>
    <div>
        <div class="tabs-container p-2 text-center">
            <div v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)"
                :class="{ 'text-blue-700 font-bold border-b-2 border-sky-500': activeTab === index, 'text-gray-300': activeTab !== index }"
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
  
  
  
  