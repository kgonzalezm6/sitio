<template>
  <div class="relative w-full">
    <!-- Input con clases Tailwind -->
    <input
      id="input"
      v-model="searchQuery"
      @focus="toggleDropdown(true)"
      @blur="toggleDropdown(false)"
      @input="filterOptions"
      @keydown.down.prevent="highlightNext"
      @keydown.up.prevent="highlightPrev"
      @keydown.enter.prevent="selectOption(highlightedIndex)"
      :class="{'border-red-500': error}"
      class="border border-gray-300 rounded-md p-2 w-full pr-10 peer focus:ring-0 focus:outline-none truncate"
      placeholder=" "
      :disabled="loading"
    />
    
    <!-- Label flotante -->
    <label
              class="absolute -top-1.5 left-3 bg-white px-1 text-gray-300 text-xs transition-all duration-200 ease-linear
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 peer-focus:-top-1.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-400
                truncate"
            >
              {{ props.title }}
    </label>
  
    <!-- Botón de borrar -->
    <button 
      v-if="searchQuery && !loading" 
      @click="clearSelection" 
      class="absolute right-2 top-3 transform -translate-y-1/2 text-red-400 hover:text-red-600 text-3xl"
    >
      &times;
    </button>
  
    <!-- Loading spinner -->
    <div 
      v-if="loading" 
      class="absolute right-2 top-1/2 transform -translate-y-1/2"
    >
      <svg class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    </div>
  
    <ul v-if="dropdownVisible && !loading" class="absolute z-[100] w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @mousedown.prevent="selectOption(index)"
        @mouseover="highlightedIndex = index"
        :class="{
          'bg-blue-500 text-white': index === highlightedIndex,
          'cursor-pointer p-2': true
        }"
      >
        {{ option[labelKey] }}
      </li>
      <li v-if="filteredOptions.length === 0" class="p-2 text-gray-500">No se encontraron opciones</li>
    </ul>
  </div>
  

</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number, Object],
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  returnKey: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Selecciona una opción',
  },
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const dropdownVisible = ref(false);
const highlightedIndex = ref(-1);

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;
  return props.options.filter(option =>
    option[props.labelKey].toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function toggleDropdown(visible) {
  if (!props.loading) {
    dropdownVisible.value = visible;
  }
}

function filterOptions() {
  if (!props.loading) {
    dropdownVisible.value = true;
    highlightedIndex.value = -1;
  }
}

function highlightNext() {
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++;
  }
}

function highlightPrev() {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
  }
}

function selectOption(index) {
  if (filteredOptions.value[index]) {
    const selectedValue = filteredOptions.value[index][props.returnKey];
    const selectedLabel = filteredOptions.value[index][props.labelKey];
    emit('update:modelValue', selectedValue);
    searchQuery.value = selectedLabel;
    dropdownVisible.value = false;
  }
}

function clearSelection() {
  searchQuery.value = '';
  emit('update:modelValue', '');
  dropdownVisible.value = false;
}

watch(() => props.modelValue, (newValue) => {
  const selectedOption = props.options.find(option => option[props.returnKey] === newValue);
  searchQuery.value = selectedOption ? selectedOption[props.labelKey] : '';
});
</script>

<style scoped>
/* Ajuste del z-index para que sea superior al del modal */
.z-40 {
  z-index: 40;
}

</style>
