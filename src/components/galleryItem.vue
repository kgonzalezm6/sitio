<!-- GalleryItem.vue -->
<template>
    <div class="gallery-item" @click="openModal">
      <img :src="image" alt="Gallery Item" class="w-full h-full object-cover" />
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['image']);
  const emit = defineEmits();
  
  const openModal = () => {
    emit('open-modal', props.image);
  };
  </script>
  
  <style scoped>
  .gallery-item {
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
  }
  
  .gallery-item:hover {
    transform: scale(1.1);
  }
  </style>
  