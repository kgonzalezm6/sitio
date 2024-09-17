<template>
    <nav class="flex text-gray-700 text-sm" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li v-for="(crumb, index) in crumbs" :key="index" class="inline-flex items-center">
          <router-link
            v-if="crumb.path && index < crumbs.length - 1"
            :to="crumb.path"
            class="inline-flex items-center text-blue-600 hover:underline"
          >
            <span v-if="crumb.icon" class="mr-2">
              <Icon :icon="crumb.icon" />
            </span>
            {{ crumb.name }}
          </router-link>
          <span v-else class="inline-flex items-center text-gray-500">
            <span v-if="crumb.icon" class="mr-2">
              <i :class="crumb.icon"></i>
            </span>
            {{ crumb.name }}
          </span>
          <span v-if="index < crumbs.length - 1" class="mx-2 text-gray-400">/</span>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    breadcrumbs: {
      type: Array,
      required: true,
      default: () => [
        { name: 'Home', path: '/', icon: 'fas fa-home' },
        { name: 'Category', path: '/category' },
        { name: 'Current Page', path: '' }, // Ruta actual
      ],
    },
  });
  
  // Se define la lista de migajas (breadcrumbs) que se recibe desde el padre
  const crumbs = props.breadcrumbs;
  </script>
  
  <style scoped>
  </style>
  