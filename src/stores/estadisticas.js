import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useestadisticasStore = defineStore('estadisticas', () => {
  const loading = ref(false);
  const errors = ref([]);
  const actrices_options = ref({
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        formatter: function(val, timestamp, opts) {
          return `<img src="${val.foto}" alt="${val.name}" style="width:50px; height:50px;"/><br>${val.name}`;
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ['#434343'],
    },
    legend: {
      show: false,
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        const data = chartOptions.value.xaxis.categories[dataPointIndex];
        return `
          <div style="padding: 10px; text-align: center;">
            <img src="${data.foto}" alt="${data.name}" style="width: 50px; height: 50px;" />
            <p>${data.name}</p>
            <p>Value: ${series[seriesIndex][dataPointIndex]}</p>
          </div>
        `;
      },
    },
    chart: {
      events: {
        dataPointMouseEnter: function (event, chartContext, config) {
          chartContext.el.querySelectorAll('.apexcharts-bar-area').forEach(el => {
            el.style.cursor = 'pointer';
          });
        },
      },
    },
  });
  const actrices_series = ref([
    {
      name: 'Actrices',
      data: [], // Valores correspondientes al total
    }
  ]);
  function top_actrices() {
    actrices_series.value = [];
    axios.get('persona/actrices')
    .then(response => {
        if(!response.data.error){
            actrices_series.value.data = response.data.series;
            actrices_options.value.xaxis.categories = response.data.categories;
            console.log(actrices_series.value);
        }else{
            errors.value = { error: [response.data.error] }
        }
    })
    .catch(err => {
        errors.value = err.response?.data?.errors
    })
    .finally(()=>{
        loading.value = true;
    })
  }
  return {
    errors,
    loading,
    actrices_series,
    actrices_options,

    top_actrices
  }
});


