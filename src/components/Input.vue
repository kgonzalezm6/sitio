<script setup>
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    icon: String,
    title: String,
    option: String,
    modelValue: [String, Number, Object],
    acceptedTypes: String,
    error: Boolean,
    datos: Array,
    name: String,
    values: String,
});

const emit = defineEmits(['update:modelValue']);

const isLoading = ref(false);
const fileInfo = ref({ name: '', size: '' });

const minYear = 1900;
const maxYear = new Date().getFullYear();

function updateValue(event) {
    if (props.option === 'file') {
        const file = event.target.files[0];
        if (file) {
            isLoading.value = true;

            // Simular un proceso de carga basado en el tamaño del archivo
            const simulateLoadingTime = Math.min(file.size / 500000, 5) * 1000; // Tiempo máximo de simulación de 5 segundos

            setTimeout(() => {
                fileInfo.value = {
                    name: file.name,
                    size: (file.size / 1024).toFixed(2) + ' KB' // Tamaño en KB
                };
                emit('update:modelValue', file);
                isLoading.value = false;
            }, simulateLoadingTime);
        } else {
            fileInfo.value = { name: '', size: '' };
            emit('update:modelValue', null);
            isLoading.value = false;
        }
    } else {
        emit('update:modelValue', event.target.value);
    }
}

function clearFile() {
    fileInfo.value = { name: '', size: '' };
    emit('update:modelValue', null);
    document.getElementById("file-input").value = ''; // Limpiar el input file
}
</script>

<template>
    <div class="input-container">
        <div v-if="props.option === 'label'" class="relative mt-2 mx-1 md:ml-4 md:mt-0">
            <input
              v-bind="$attrs"
              :class="{ 'border-red-500': props.error }"
              class="border border-gray-300 rounded-md p-2 w-full peer focus:ring-0 focus:outline-none"
              type="text"
              :value="props.modelValue"
              @input="updateValue"
              placeholder=" "
            />
            
            <label
              class="absolute -top-1.5 left-3 bg-white px-1 text-gray-600 text-xs transition-all duration-200 ease-linear
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 peer-focus:-top-1.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-400
                truncate"
            >
              {{ props.title }}
            </label>
        </div>
        
        <div v-else-if="props.option === 'year'" class="relative mt-2 mx-1 md:ml-4 md:mt-0">
            <input
              v-bind="$attrs"
              :class="{ 'border-red-500': props.error }"
              class="border border-gray-300 rounded-md p-2 w-full peer focus:ring-0 focus:outline-none"
              type="number"
              :value="props.modelValue"
              :min="minYear"
              :max="maxYear"
              step="1"
              @input="updateValue"
              placeholder=" "
            />
            
            <label
              class="absolute -top-1.5 left-3 bg-white px-1 text-gray-600 text-xs transition-all duration-200 ease-linear
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 peer-focus:-top-1.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-400"
            >
            {{ props.title }}
            </label>
        </div>

        <div v-else-if="props.option === 'numeric'" class="relative mt-2 mx-1 md:ml-4 md:mt-0">
            <input
              v-bind="$attrs"
              :class="{ 'border-red-500': props.error }"
              class="border border-gray-300 rounded-md p-2 w-full peer focus:ring-0 focus:outline-none"
              type="number"
              :value="props.modelValue"
              @input="updateValue"
              placeholder=" "
            />
            
            <label
              class="absolute -top-1.5 left-3 bg-white px-1 text-gray-600 text-xs transition-all duration-200 ease-linear
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 peer-focus:-top-1.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-400"
            >
            {{ props.title }}
            </label>
        </div>

        <div v-else-if="props.option === 'url'" class="relative mt-2 mx-1 md:ml-4 md:mt-0">
            <input
              v-bind="$attrs"
              :class="{ 'border-red-500': props.error }"
              class="border border-gray-300 rounded-md p-2 w-full peer focus:ring-0 focus:outline-none"
              type="url"
              :value="props.modelValue"
              @input="updateValue"
              placeholder=" "
            />
            
            <label
              class="absolute -top-1.5 left-3 bg-white px-1 text-gray-600 text-xs transition-all duration-200 ease-linear
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 peer-focus:-top-1.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-400"
            >
            {{ props.title }}
            </label>
        </div>

        <div v-else-if="props.option === 'file'" class="relative mt-2 mx-1 md:ml-4 md:mt-0">
            <label for="file-input" class="cursor-pointer items-center border border-gray-300 rounded-md p-2 bg-white text-gray-600 w-full flex flex-col">
                <Icon icon="fa-cloud-upload-alt" class="fa-lg mr-2" />
                <span>Seleccionar archivo</span>
                <input :accept="props.acceptedTypes" id="file-input" type="file" class="hidden" @change="updateValue"/>
                <div v-if="isLoading" class="mt-2 text-gray-500">
                    <div class="flex-col gap-4 w-full flex items-center justify-center">
                        <div
                          class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                        >
                          <div
                            class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                          ></div>
                        </div>
                      </div>
                </div>
                <div v-else-if="fileInfo.name" class="mt-2 text-gray-500 relative w-full">
                    <div>Nombre: {{ fileInfo.name }}</div>
                    <div>Tamaño: {{ fileInfo.size }}</div>
                    
                    <!-- Botón de eliminar archivo -->
                    <button @click="clearFile" class="absolute top-0 right-0 text-red-500 hover:text-red-700">
                        <Icon icon="fa-times" class="fa-lg"/>
                    </button>
                </div>
            </label>
        </div>
    
        <div v-else-if="props.option === 'area'" class="relative mb-3">
            <textarea
                v-bind="$attrs"
                :value="props.modelValue"
                @input="updateValue"
                :class="{ 'border-red-500': props.error }"
                rows="5"
                class="peer m-0 block w-full bg-white rounded border-2 focus-within:border-blue-400 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
            />
            <label
                class="absolute left-0 top-0 border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-0.15rem peer-focus:scale-85 peer-focus:text-gray-400 uppercase">
                {{ props.title }}
            </label>
        </div>
    
        <div v-else-if="props.option === 'select'" class="relative mt-2 mx-1 md:ml-4 md:mt-0">
            <v-select 
                :options="props.datos"  
                append-to-body
                :value="props.modelValue"
                @input="updateValue"
                :class="{ 'border-red-500': props.error }"
                class="border border-gray-300 rounded-md p-2 w-full peer"
                :label="props.name"
            />
            <label
                class="absolute -top-1.5 left-3 bg-white px-1 text-gray-600 text-xs transition-all duration-200 ease-linear">
                {{ props.title }}
            </label>
        </div>
    
        <div v-else-if="props.option === 'date'" class="relative mt-2 mx-1 md:ml-4 md:mt-0">
            <input
                v-bind="$attrs"
                :class="{ 'border-red-500': props.error }"
                class="border border-gray-300 rounded-md p-2 w-full peer"
                type="date"
                :value="props.modelValue"
                @input="updateValue"
            />
            <label
                class="absolute -top-1.5 left-3 bg-white px-1 text-gray-400 text-xs transition-all duration-200 ease-linear
                truncate">
                {{ props.title }}
            </label>
        </div>
    
        <div v-else-if="props.option === 'multiselect'" class="relative mb-3">
            <select
                v-bind="$attrs"
                :class="{ 'border-red-500': props.error }"
                class="border border-gray-300 rounded-md p-2 w-full peer"
                :value="props.modelValue"
                @input="updateValue"
            >
                <option v-for="item in props.datos" :key="item[props.values]" :value="item[props.values]">
                    {{ item[props.name] }}
                </option>
            </select>
            <label
                class="absolute left-0 top-0 border border-solid border-transparent px-3 py-4 text-neutral-500 font-bold transition duration-200 ease-linear uppercase">
                {{ props.title }}
            </label>
        </div>
    
        <div v-else class="input flex items-center bg-white" :class="{ 'border-red-500': props.error }">
            <Icon v-if="props.icon" :icon="props.icon" class="text-gray-500 mr-2" />
            <input
                v-bind="$attrs"
                :value="props.modelValue"
                @input="updateValue"
                class="focus:outline-none h-auto text-lg w-full"
            />
        </div>
    </div>
</template>
<style scoped>
.input-container > div {
    margin-bottom: 1rem;
}
</style>