<template>
    <div>
        <div>
            <Breadcrumbs :breadcrumbs="breadcrumbs" class="mb-10" />
            <div class="bg-white w-full shadow-all grid grid-cols-2 md:grid-cols-6 gap-5 p-2">
                <router-link :to="{ name: 'Chicas' }" class="w-full bg-rose-300 rounded-lg h-[3.5rem] flex">
                    <div class="truncate w-[70%]">Chicas</div>
                    <div class="text-4xl ml-auto mr-2">1</div>
                </router-link>
                <router-link :to="{ name: 'Peliculas' }" class="w-full bg-rose-300 rounded-lg h-[3.5rem] flex">
                    <div class="truncate w-[70%]">Peliculas</div>
                    <span class="text-4xl ml-auto mr-2">1</span>
                </router-link>
                <router-link :to="{ name: 'Empresas' }" class="w-full bg-rose-300 rounded-lg flex">
                    <div class="truncate w-[70%]">Empresas</div>
                    <span class="text-4xl ml-auto mr-2">1</span>
                </router-link>
                <div class="w-full bg-rose-300 rounded-lg  flex">
                    <div class="truncate w-[70%]">Actrices</div>
                    <span class="text-4xl ml-auto mr-2">1</span>
                </div>
                <div class="w-full bg-rose-300 rounded-lg  flex">
                    <div class="truncate w-[70%] h-[3.5rem]">Series</div>
                    <span class="text-4xl ml-auto mr-2">1</span>
                </div>
                <div class="w-full bg-rose-300 rounded-lg flex">
                    <div class="truncate w-[70%] h-[3.5rem]">Mantenimiento</div>
                    <span class="text-4xl ml-auto mr-2"></span>
                </div>
            </div>
            <div class="bg-white w-full shadow-all grid md:grid-cols-2 gap-5 my-10 p-8">
                <div class="w-full h-[15rem] bg-rose-600">
                    <div id="chart">
                        <apexchart type="bar" height="350" :options="chartOptions" :series="series"
                            @dataPointSelection="dataPointSelectionHandler"></apexchart>
                    </div>
                    <div id="chart" v-if="ver">
                        <apexchart type="bar" height="350" :options="chartOptions2" :series="series"
                            @dataPointSelection="dataPointSelectionHandler"></apexchart>
                    </div>
                </div>
                <div class="w-full h-[15rem] bg-rose-600"> </div>
                <div class="w-full h-[15rem] bg-rose-600"> </div>
                <div class="w-full h-[15rem] bg-rose-600"> </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { onBeforeMount, ref, onMounted } from 'vue';
import { useGeneralStore } from '../stores/general.js'
import { useestadisticasStore } from '../stores/estadisticas';
const generalStore = useGeneralStore();
const estadisticasStore = useestadisticasStore();
const breadcrumbs = [
    { name: 'Home', path: '/', icon: 'fas fa-home' },
    { name: 'Persona', path: '' }
];
const ver = ref(false);
const series = ref([{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
}]);
const chartOptions = ref({
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
        ],
    }
});

const chartOptions2 = ref({
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: false,
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
        ],
    }
});

function dataPointSelectionHandler(e, chartContext, config) {
    const dataPointIndex = config.dataPointIndex;  // Índice del punto de datos seleccionado
    const category = chartContext.w.config.xaxis.categories[dataPointIndex];  // Obtén la categoría correspondiente
    console.log('Categoría seleccionada:', category);
    ver.value = !ver.value;
}
onBeforeMount(() => {

});
onMounted(() => {
    console.log('Persona montado');
});
</script>