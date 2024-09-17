import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useGlobalStore } from './global';
export const useTipoPeiculaStore = defineStore('tipopelicula', () => {
  const global = useGlobalStore();
  const headers = ref([
    {
      title: 'ID',
      align: 'left',
      key: 'id',
    },
    {
      title: 'NOMBRE',
      align: 'left',
      key: 'NOMBRE',
    },
    {
      title: 'SITIO',
      align: 'end',
      key: 'SITIO',
    },
    {
      title: 'FOTO',
      align: 'middle',
      key: 'FOTO',
    },
    {
      title: 'ESTADO',
      align: 'middle',
      key: 'ESTADO',
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
  let btn_editar = ref(false);
  let btn_nuevo = ref(false);
  let btn_eliminar = ref(false);

  async function index(){
    try{

        const response = await axios.get('persona/tipopelicula')
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
    }catch (error){
        console.error(error)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + error,'danger');
    }
  }
  function opciones(item, type) {
    registro.value = item;
    switch (type) {
      case value:
        // Add your case logic here
        break;
      default:
        break;
    }
    loading_opciones.value = true;
  };
  function reset() {
    btn_nuevo.value = false;
    btn_editar.value = false;
    btn_eliminar.value = false;
    registro.value = [];
    registros.value = [];
    loading_registro.value = false;
    loading_registros.value = false;
  }
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
    btn_editar,
    btn_nuevo,
    btn_eliminar,
    opciones,
    reset,


    index,
  };
});