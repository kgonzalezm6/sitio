import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useestadisticasStore = defineStore('estadisticas', () => {
  const loading = ref(false);
  const errors = ref([]);
  const chicas_series = ref([]);
  const chicas_options = ref({
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    }, 
    xaxis: {
      categories: ["Cantidad de peliculas"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        }
      }
    
    },
    title: {
      text: 'TOP 10 CHICAS',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  });
  const empresas_series = ref([]);
  const empresas_options = ref({
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    }, 
    xaxis: {
      categories: ["Cantidad de peliculas"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        }
      }
    
    },
    title: {
      text: 'TOP 10 EMPRESAS',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  });
  const series_series = ref([]);
  const series_options = ref({
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    }, 
    xaxis: {
      categories: ["Cantidad de actrices"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        }
      }
    
    },
    title: {
      text: 'TOP 10 SERIES',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  });
  const actrices_series = ref([]);
  const actrices_options = ref({
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    }, 
    xaxis: {
      categories: ["Cantidad de series"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        }
      }
    
    },
    title: {
      text: 'TOP 10 ACTRICES',
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  });
  function chicas() {
    chicas_series.value = [];
    axios.get('estadisticas/chicas')
    .then(response => {
        if(!response.data.error){
            const test = response.data.map(i =>{
                chicas_series.value.push({name:i.NOMBRE_CHICA, data:[i.num_peliculas]});
            })
        }else{
            errors.value = { error: [response.data.error] }
        }
    })
    .catch(err => {
        errors.value = err.response?.data?.errors
    })
    .finally(()=>{
        loading.value = false
    })
  }
  function empresas() {
    empresas_series.value = [];
    axios.get('estadisticas/empresas')
    .then(response => {
        if(!response.data.error){
            const test = response.data.map(i =>{
                empresas_series.value.push({name:i.nombre, data:[i.num_peliculas]});
            })
        }else{
            errors.value = { error: [response.data.error] }
        }
    })
    .catch(err => {
        errors.value = err.response?.data?.errors
    })
    .finally(()=>{
        loading.value = false
    })
  }
  function series() {
    series_series.value = [];
    axios.get('estadisticas/series')
    .then(response => {
        if(!response.data.error){
            const test = response.data.map(i =>{
                series_series.value.push({name:i.nombre, data:[i.num]});
            })
        }else{
            errors.value = { error: [response.data.error] }
        }
    })
    .catch(err => {
        errors.value = err.response?.data?.errors
    })
    .finally(()=>{
        loading.value = false
    })
  }
  function actrices() {
    actrices_series.value = [];
    axios.get('estadisticas/actrices')
    .then(response => {
        if(!response.data.error){
            const test = response.data.map(i =>{
                actrices_series.value.push({name:i.nombre, data:[i.num]});
            })
        }else{
            errors.value = { error: [response.data.error] }
        }
    })
    .catch(err => {
        errors.value = err.response?.data?.errors
    })
    .finally(()=>{
        loading.value = false
    })
  }
  return {
    errors,
    loading,
    chicas_series,
    chicas_options,
    empresas_series,
    empresas_options,
    series_series,
    series_options,
    actrices_series,
    actrices_options,

    chicas,
    empresas,
    series,
    actrices
  }
});


