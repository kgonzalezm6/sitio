<!-- GalleryModal.vue -->
<template>
    <div class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <img :src="selectedImage" alt="Selected Item" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['selectedImage']);
  const emit = defineEmits();
  
  const closeModal = () => {
    emit('close-modal');
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  
  .modal-content {
    max-width: 90%;
    max-height: 90%;
  }
  
  .modal-content img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  </style>
  