<script setup>
import { defineEmits } from 'vue';
import { ref, computed } from 'vue';
const props = defineProps({
    icon: '',
    title: '',
    option: '',
    modelValue: '',
    error: false,
    datos: null,
    name:'',
    values:''
});
const  searchQuery = ref('');
const isSelectOpen = ref(false);
defineEmits(['update:modelValue'])
defineOptions({
    inheritAttrs: false
});
const filteredOptions = computed(() => {
      return props.datos.filter(option =>
        option[props.name].toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    function toggleSelect() {
      isSelectOpen.value = !isSelectOpen.value;
    };
    function closeSelect() {
      isSelectOpen.value = false;
    }

</script>

<template>
    <div v-if="props.option === 'label'" class="relative mb-3">
        <input v-bind="$attrs" :class="{ 'border-red-500': props.error }"
            class="w-full peer m-0 block h-[58px] bg-white rounded border-2 focus-within:border-blue-400 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
            placeholder="name@example.com" :value="props.modelValue"
            @input="$emit('update:modelValue', $event.target.value)" />
        <label
            class="truncate pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
            {{ props.title }}
        </label>
    </div>
    <div v-else-if="props.option === 'file'">
        <label for="file" class="cursor-pointer inline-flex items-center">
            <icon icon="fa-cloud-upload-alt" class="fa-lg mr-2" />
            Subir archivo
        </label>
        <input v-bind="$attrs" id="file" type="file" class="hidden">
    </div>
    <div v-else-if="props.option === 'area'" class="relative mb-3">
        <textarea v-bind="$attrs" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="{ 'border-red-500': props.error }" rows="5"
            class="peer m-0 block w-full bg-white rounded border-2 focus-within:border-blue-400 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]" />
        <label
            class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
            {{ props.title }}
        </label>
    </div>
    <div v-else-if="props.option === 'select'" class="relative mb-3">
        <!-- <input v-show="isSelectOpen" v-model="searchQuery" type="text" placeholder="Buscar..." class="h-5 block w-full bg-white rounded border-2 focus:outline-none focus:border-blue-400 px-3 py-2 mb-2" style="position: absolute; top: 0; left: 0; z-index: 1;"> -->
        <select v-bind="$attrs"
                :value="props.modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @click="toggleSelect"
                @blur="closeSelect"
                :class="{ 'border-red-500': props.error }"
                class="peer m-0 block w-full bg-white rounded border-2 focus-within:border-blue-400 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight 
                text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 
                focus:outline-none peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]">
            <option disabled>SELECCIONE</option>
            <option v-for="item in filteredOptions" :value="item[props.values]">
                    {{item[props.name]}}
            </option>
        </select>
        
        <label class="truncate pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
            {{ props.title }}
        </label>
    </div>
    <div v-else-if="props.option === 'multiselect'" class="relative mb-3">
        <select v-bind="$attrs" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="{ 'border-red-500': props.error }" multiple
          class="peer m-0 block w-full bg-white rounded border-2 focus-within:border-blue-400 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight 
          text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 
          focus:outline-none peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]">
          <option v-for="item in props.datos" :value="item[props.values]">{{item[props.name]}}</option>
        </select>
        <label
          class="truncate pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none uppercase">
          {{ props.title }}
        </label>
    </div>
    
    <div v-else class="input flex items-center bg-white" :class="{ 'border-red-500': props.error }">
        <icon v-if="props.icon" :icon="props.icon" class="text-gray-500 mr-2" />
        <input v-bind="$attrs" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)"
            class="focus:outline-none h-auto text-lg w-full">
    </div>
</template>