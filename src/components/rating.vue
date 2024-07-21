<template>
    <div>
      <span v-for="n in 10" :key="n"  :class="{ 'filled': n <= rating }">&#9733;</span>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const props = defineProps({
    initialRating: {
      type: Number,
      required: true
    }
  });
  const rating = ref(props.initialRating);
  
  const rate = (n) => {
    rating.value = n;
    // Aquí podrías emitir un evento para informar del cambio de calificación
  };

  </script>
  
  <style>
    .filled {
      color: gold;
    }
  </style>