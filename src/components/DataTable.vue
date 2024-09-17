<template>
  <div class="bg-white rounded-2xl z-10 shadow-lg p-5">
    <section class="mx-auto mb-1">
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="flex items-center px-2 py-1.5 rounded-2xl shadow-xl border">
          <span>Mostrar</span>
          <select v-model="rowsPerPage" @change="resetPage" class="text-center bg-white font-bold w-full focus:outline-none ring-0">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>registros</span>
        </div>
        <div class="relative flex items-center mt-4 md:mt-0">
          <input v-model="search" type="search" placeholder="Buscar" class="block w-full py-1.5 pr-12 text-gray-700 bg-white border shadow-lg border-gray-200 rounded-2xl md:w-80 placeholder-gray-400/70 pl-5 rtl:pr-5 rtl:pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
          <span class="absolute inset-y-0 right-0 flex items-center pr-3">
            <div class="bg-[#FCD436] h-6 w-6 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-800 rotate-90">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </span>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-5 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border-2 border-gray-200 shadow-lg md:rounded-lg">
              <table v-if="!isMobile" class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr :class="color">
                    <th v-for="(head, index) in props.headers" :key="index" @click="(head.sort) ? sort(head.key) : ''" scope="col" class="px-4 py-3.5 text-sm font-semibold rtl:text-right cursor-pointer" :width="head.width" :align="head.align ?? 'left'">
                      {{ head.title }} 
                      <span v-if="sortColumn === head.key">
                        {{ sortDir === 'asc' ? '▲' : '▼' }}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-100 text-gray-800">
                    <td v-for="(head, headIndex) in headers" :key="headIndex" class="px-4 py-2" :align="head.align" :width="head.width">
                      <slot :name="head.key" :item="item">
                        <p class="text-sm font-normal">{{ getObjectValue(item, head.key) }}</p>
                      </slot>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else>
                <div v-for="item in paginatedData" :key="item.id" class="p-4 mb-2 border rounded-lg shadow-md divide-y divide-gray-200">
                  <div v-for="(head, headIndex) in headers" :key="headIndex" class="mb-2 flex items-center">
                    <strong class="w-1/3">{{ head.title }}:</strong>
                    <span class="ml-2 w-2/3">
                      <slot :name="head.key" :item="item">
                        <p class="text-sm font-normal">{{ getObjectValue(item, head.key) }}</p>
                      </slot>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <!-- RESPONSIVE MOBILE BUTTONS -->
        <div class="flex flex-1 justify-between md:hidden">
          <a @click="(currentPage == 1) ? currentPage = 1 : currentPage--" class="relative inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
            Anterior
          </a>
          <a @click="(currentPage == totalPages) ? currentPage = totalPages : currentPage++" class="relative ml-3 inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
            Siguiente
          </a>
        </div>
        <div class="hidden md:flex md:flex-1 sm:items-center sm:justify-between select-none">
          <div>
            <p class="text-xs text-gray-500">
              Mostrando
              <span class="font-medium">{{ startIndex + 1 }}</span>
              a
              <span class="font-medium">{{ (endIndex >= filteredData.length) ? filteredData.length : endIndex }}</span>
              de
              <span class="font-medium">{{ filteredData.length }}</span>
              resultados
            </p>
          </div>
          <div v-show="filteredData.length >= 11 && displayedPages.length > 1">
            <nav aria-label="Pagination">
                  <a @click="currentPage > 1 && currentPage--" 
                    class="justify-center items-center space-x-2 px-1.5" 
                    :disabled="currentPage === 1">
                    <span class="sr-only">Previous</span>
                    <span class="w-6 h-6 px-4 py-2 border rounded-full bg-gray-100"
                          :class="[currentPage === 1 ? 'hidden' : '']">&laquo;</span>
                  </a>
                  
                  <a v-if="currentPage !== 1" @click="setCurrentPage(1)" 
                    class="cursor-pointer px-4 py-2 border rounded-full"
                    :class="[currentPage === 1 ? 'bg-blue-500 text-white' : 'text-black']">
                    {{ 1 }}
                  </a>

                  <a :class="page === currentPage ? 'bg-blue-500 text-white' : 'text-black'" 
                    v-for="page in displayedPages" :key="page" @click="setCurrentPage(page)" 
                    class="px-4 py-2 border rounded-full">
                    {{ page }}
                  </a>

                  <span v-if="currentPage < totalPages - 2">....</span>

                  <a v-if="currentPage !== totalPages" @click="setCurrentPage(totalPages)" 
                    class="cursor-pointer px-4 py-2 border rounded-full"
                    :class="[currentPage === totalPages ? 'bg-blue-500 text-white' : 'text-black']">
                    {{ totalPages }}
                  </a>
                  
                  <a @click="currentPage < totalPages && currentPage++" 
                    class="justify-center items-center space-x-2">
                    <span class="sr-only">Next</span>
                    <span class="w-6 h-6 px-4 py-2 border rounded-full bg-gray-100"
                          :class="[currentPage === totalPages ? 'hidden' : '']">&raquo;</span>
                  </a>
              </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const search = ref('');
const startIndex = ref(1);
const endIndex = ref(1);
const currentPage = ref(1);
const rowsPerPage = ref(10);
const searchables = [];
const sortColumn = ref(null);
const sortDir = ref('asc');
const isMobile = ref(false);

const props = defineProps({
  headers: null,
  data: null,
  color: {
    default: 'bg-[#F2FAFF] text-[#6F7582]'
  },
  loading: false
});
const data = computed(() => props.data);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 640;
};

props.headers.map(el => {
  searchables.push(el.key.trim());
});

const filteredData = computed(() => {
  currentPage.value = 1;
  const searchTerms = search.value.trim().split(';').map(term => term.trim().toLowerCase());
  return sortedItems.value.filter(item => {
    return searchTerms.every(searchTerm => {
      return searchables.some(column => {
        const value = getObjectValue(item, column);
        return String(value).toLowerCase().includes(searchTerm);
      });
    });
  });
});

function getObjectValue(object, key) {
  const keys = key.split('.');
  return keys.reduce((value, currentKey) => {
    return value && value[currentKey];
  }, object);
}

const paginatedData = computed(() => {
  startIndex.value = (currentPage.value - 1) * rowsPerPage.value;
  endIndex.value = parseInt(startIndex.value) + parseInt(rowsPerPage.value);
  return filteredData.value.slice(startIndex.value, endIndex.value);
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage.value));

const setCurrentPage = page => {
  currentPage.value = page;
};

const displayedPages = computed(() => {
  const totalDisplayedPages = 6;
  const halfDisplayedPages = Math.floor(totalDisplayedPages / 2);
  let startPage = Math.max(currentPage.value - halfDisplayedPages, 1);
  let endPage = Math.min(startPage + totalDisplayedPages - 1, totalPages.value);
  
  if (endPage - startPage + 1 < totalDisplayedPages) {
    startPage = Math.max(endPage - totalDisplayedPages + 1, 1);
  }
  
  return Array(endPage - startPage + 1).fill().map((_, index) => startPage + index);
});

function sort(column) {
  if (sortColumn.value === column) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortDir.value = 'asc';
  }
}

const sortedItems = computed(() => {
  if (sortColumn.value) {
    return data.value.slice().sort((a, b) => {
      const valA = getObjectValue(a, sortColumn.value);
      const valB = getObjectValue(b, sortColumn.value);

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDir.value === 'asc' ? valA - valB : valB - valA;
      } else {
        return sortDir.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
    });
  }
  return data.value;
});

const resetPage = () => {
  currentPage.value = 1;
};

onMounted(() => {
  setTimeout(() => {
    if (data.value.length === 0 && props.loading === true) {
      props.loading = false;
    }
  }, 2000);
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  vertical-align: middle;
  color: #6F7582;
}

td {
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: center;
  vertical-align: middle;
}
@media (max-width: 768px) {
  .mobile-table {
    display: none;
  }
}
</style>
