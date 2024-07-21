import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useSerieStore = defineStore('serie', () => {
  let series = ref([]);
  let error = ref([]);
  let loading_series = ref(false);
  let option_editar = ref(false);
  let option_crear = ref(false);
  let option_eliminar = ref(false);
  let loading_editar = ref(false);
  let loading_crear = ref(false);
  let loading_eliminar = ref(false);
  let loading_serie = ref(false);
  let loading_temporada = ref(false);
  let one_serie = ref([]);
  let temporadas = ref([]);
  let serie = ref({
    nombre:'',
    fecha:'',
    sitio:'',
    imagen:'',
    estado:'',
    visualizacion:''
  });
  let id = ref(0);
  const headers= [{
    title: 'ID',
    align: 'start',
    sort: true,
    key: 'id_serie'
  },
  {
    title: 'NOMBRE SERIE',
    align: 'end',
    sort: true,
    key: 'nombre'
  },
  {
    title: 'FECHA',
    align: 'end',
    sort: true,
    key: 'fecha'
  },
  {
    title: 'SITIO',
    align: 'middle',
    sort: true,
    key: 'sitio'
  },
  {
    title: 'FOTO',
    align: 'middle',
    key: 'imagen'
  },
  {
    title: 'ESTADO',
    align: 'middle',
    key: 'estado'
  },
  {
    title: 'ACCIONES',
    align: 'end',
    key: 'actions'
  }
];
const headers_temporada= [{
  title: 'ID',
  align: 'start',
  sort: true,
  key: 'id_episodio'
},
{
  title: 'NO EPISODIO',
  align: 'start',
  sort: true,
  key: 'no_episodio'
},
{
  title: 'NOMBRE',
  align: 'end',
  sort: true,
  key: 'nombre'
},
{
  title: 'FECHA',
  align: 'end',
  sort: true,
  key: 'fecha'
},
{
  title: 'CALIFICACIÓN',
  align: 'middle',
  sort: true,
  key: 'calificacion'
},
{
  title: 'VISUALIZACIÓN',
  align: 'middle',
  key: 'visualizacion'
},
{
  title: 'FOTO',
  align: 'middle',
  key: 'imagen'
},
{
  title: 'ACCIONES',
  align: 'end',
  key: 'actions'
}
];
  const estado =[
    {id: 'F', nombre: 'FINALIZADO',color:'bg-red-500'},
    {id: 'E', nombre: 'EMISION',color:'bg-green-500'},
    {id: 'P', nombre: 'PENDIENTE',color:'bg-sky-500'},
  ];
  const visualizacion =[
    {id: '1', nombre: 'VIENDO'},
    {id: '2', nombre: 'PENDIENTE'},
    {id: '3', nombre: 'FINALIZADO'},
  ];
  async function getSerie() {
    loading_series.value = true;
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'series/serie')
      .then(response => {
        if (!response.data.error) {
          series.value = response.data;
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
        loading_series.value= false;
      })
  };
  async function getOneSerie() {
    loading_serie.value = true;
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'series/serie/'+id.value)
      .then(response => {
        if (!response.data.error) {
          one_serie.value = response.data.datos;
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
        loading_serie.value= false;
      })
  };
  async function getTemporadaEpisodio() {
    loading_temporada.value = true;
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'series/temporada/'+id.value)
      .then(response => {
        if (!response.data.error) {
          temporadas.value = response.data.datos;
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
        loading_temporada.value= false;
      })
  };
  async function updateSerie() {
    loading_editar.value = true;
    const global = useGlobalStore();
    const response = await axios.put(
        import.meta.env.VITE_MY_BASE + 'series/serie/'+one_serie.value.id_serie,one_serie.value)
      .then(response => {
        if (!response.data.error) {
            if(response.data.codigo == 1){
              global.setAlert(response.data.mensaje,"success","Exito");
              option_editar.value = false;
              this.getSerie();
            }
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
        loading_editar.value= false;
      })
  };
  async function deleteSerie() {
    loading_eliminar.value = true;
    const global = useGlobalStore();
    const response = await axios.delete(
        import.meta.env.VITE_MY_BASE + 'series/serie/'+one_serie.value.id_serie,one_serie.value)
      .then(response => {
        if (!response.data.error) {
            if(response.data.codigo == 1){
              global.setAlert(response.data.mensaje,"success","Exito");
              option_eliminar.value = false;
              this.getSerie();
            }
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
        loading_eliminar.value= false;
      })
  };
  async function crearSerie(){
    const global = useGlobalStore();
    loading_crear.value = true;
    const response = await axios.post(
      import.meta.env.VITE_MY_BASE + 'series/serie',serie.value)
    .then(response => {
      if (!response.data.error) {
          if(response.data.codigo == 1){
            global.setAlert(response.data.mensaje,"success","Exito");
            option_crear.value = false;
            this.getSerie();
          }
      } else {
        global.setAlert('Ha ocurrido un error al cargar la información','danger');
        error.value = response.data.error;
      }
    })
    .catch(err => {
      console.error(err)
      global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err,'danger');
      error.value = err.response.data.errors;
    })
    .finally(()=>{
      loading_crear.value= false;
      serie.value = [];

    })
  }
  function open(item, option){
    one_serie.value = item;
    switch (option) {
      case 1:
        option_editar.value = true;
        break;
      case 2:
        option_eliminar.value = true;
        break;
      case 3:
          option_crear.value = true;
          break;
      default:
        break;
    }
  }
  return {
    series,
    serie,
    error,
    loading_series,
    loading_serie,
    headers,
    headers_temporada,
    option_editar,
    option_crear,
    option_eliminar,
    one_serie,
    visualizacion,
    estado,
    loading_editar,
    loading_crear,
    loading_eliminar,
    id,
    temporadas,
    loading_temporada,


    getSerie,
    crearSerie,
    getOneSerie,
    updateSerie,
    deleteSerie,
    getTemporadaEpisodio,
    open,
  }
});
