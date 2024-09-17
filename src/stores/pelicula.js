import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useGlobalStore } from './global';
export const usePeliculaStore = defineStore('pelicula', () => {
  const global = useGlobalStore();
  const headers = ref([
    {
      title: 'ID',
      align: 'left',
      key: 'id_pelicula',
    },
    {
      title: 'NOMBRE',
      align: 'left',
      key: 'nombre',
    },
    {
      title: 'FECHA',
      align: 'end',
      key: 'fecha_string',
    },
    {
      title: 'EMPRESA',
      align: 'middle',
      key: 'empresa',
    },
    {
      title: 'TIPO',
      align: 'middle',
      key: 'tipo',
    },
    {
      title: 'ESTADO',
      align: 'middle',
      key: 'estado',
    },
    {
      title: 'ACCIONES',
      align: 'middle',
      key: 'actions',
      sort: true
    }
  ]);
  let errors = ref([]);
  let id = ref(null);
  let registro = ref([]);
  let loading_registro = ref(false);
  let registros = ref([]);
  let loading_registros = ref(false);
  let loading_opciones = ref(false);
  let opcion_editar = ref(false);
  let opcion_nuevo = ref(false);
  let opcion_eliminar = ref(false);
  let opcion_unir = ref(false);
  let btn_editar = ref(false);
  let btn_nuevo = ref(false);
  let btn_eliminar = ref(false);
  let btn_unir = ref(false);
  let imagen = ref(null);
  let nuevo = reactive({
    nombre : null,
    fecha : null,
    tipo : null,
    empresa : null
  })
  async function index(){   
    try {
      const response = await axios.get('persona/pelicula')
      if (!response.data.error) {
        if(response.data.codigo == 1){
          registros.value = response.data.datos;
        }else{
          global.setAlert(response.data.mensaje,response.data.color);
        }
        loading_registros.value = true;
      } else {
      global.setAlert(response.data.mensaje,response.data.color);
    }
    } catch (error) {
      console.error(error)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + error,'danger');
    } finally {

    }   
  }
  async function store(){ 
    btn_nuevo.value = true; 
    try {
      const response = await axios.post('persona/pelicula', nuevo);
      if (!response.data.error) {
        if(response.data.codigo == 1){
          global.setAlert(response.data.mensaje,response.data.color);
          this.reset();
        }else{
          global.setAlert(response.data.mensaje,response.data.color);
        }
      } else {
      global.setAlert(response.data.mensaje,response.data.color);
    }
    } catch (error) {
        errors.value = error.response.data.errors;
        global.setAlert(error,'danger');
    } finally {
      btn_nuevo.value = false; 
    }   
  }
  async function update() { 
    btn_editar.value = true; 
    try {
      const response = await axios.put('persona/pelicula/' + registro.value.id_pelicula, registro.value);     
      if (response.data.error) {
        global.setAlert(response.data.mensaje, response.data.color);
      } else {
        if (response.data.codigo == 1) {
          global.setAlert(response.data.mensaje, response.data.color);
          this.index();
          opcion_editar.value = false;
          this.reset();
        } else {
          global.setAlert(response.data.mensaje, response.data.color);
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      errors.value = error.response?.data?.errors || 'Error desconocido';
      global.setAlert(error.response?.data?.mensaje || 'Error en la solicitud', 'danger');
    } finally {
      btn_editar.value = false; 
    }   
  }
  function opciones(type, item = null) {
    registro.value = item;
    switch (type) {
      case 1:
        opcion_nuevo.value = true;
        break;
      case 2:
        opcion_editar.value = true;
        break;
      case 3:
        opcion_eliminar.value = true;
      case 4:
        opcion_unir.value = true;
        console.log('unir: '+ opcion_unir.value);
        break;
      default:
        break;
    }
    loading_opciones.value = true;
  };
  function reset() {
    nuevo.nombre = null;
    nuevo.fecha = null;
    nuevo.tipo = null;
    nuevo.empresa = null;
    this.index();
  };
  return {
    errors,
    headers,
    registros,
    loading_registros,
    registro,
    loading_registro,
    loading_opciones,
    id,
    opcion_editar,
    opcion_nuevo,
    opcion_eliminar,
    opcion_unir,
    btn_editar,
    btn_nuevo,
    btn_eliminar,
    btn_unir,
    nuevo,
    imagen,

    opciones,
    reset,
    index,
    store,
    update,
  };
});