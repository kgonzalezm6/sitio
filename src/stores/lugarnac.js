import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useLugarnacStore = defineStore('lugarnac', () => {
  const global = useGlobalStore();
  let lugarnac = ref([]);
  let loading_lugarnac = ref(false);
  let lugar = ref([]);
  let loading_lugar = ref(true);
  const headers= [{
    title: 'ID',
    align: 'start',
    sort: true,
    key: 'id_lugarnac'
  },
  {
    title: 'NOMBRE',
    align: 'end',
    sort: true,
    key: 'nombre'
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
  let error = ref([]);
  let nombre = ref('');
  let option_editar = ref(false);
  let opcion_nuevo = ref(false);
  let option_eliminar = ref(false);
  let btn_editar = ref(false);
  let btn_crear = ref(false);
  let btn_eliminar = ref(false);
  function accion(item, option){
    lugar.value = item;
    loading_lugar.value = true;
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
    loading_lugar.value = false;
  }
  async function getLugarnac() {
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'persona/lugarnac')
      .then(response => {
        if (!response.data.error) {
          lugarnac.value = response.data;
          loading_lugarnac.value = false;
        } else {
          console.log();
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        console.log();
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
      })
  };
  async function CreateLugarnac() {
    btn_crear.value = true;
    const json ={
      nombre: nombre.value
    }
    const response = await axios.post('persona/lugarnac',json)
      .then(response => {
        console.log(response.data);
        if (!response.data.error) {
          if(response.data.codigo == 2){
            global.setAlert(response.data.mensaje,response.data.color);
            this.getLugarnac();
            opcion_nuevo.value = false;
            nombre.value = '';
            error.value = [];
          }else{
            global.setAlert(response.data.mensaje,response.data.color);
          }
        } else {
          global.setAlert(response.data.mensaje,response.data.color);
        }
      })
      .catch(err => {
        error.value = err.response.data.errors;
      })
      .finally(()=>{
        btn_crear.value = false;
      })
  };
  return {
    lugarnac,
    loading_lugarnac,
    lugar,
    loading_lugar,
    headers,
    error,
    opcion_nuevo,
    option_editar,
    option_eliminar,
    btn_crear,
    btn_editar,
    btn_eliminar,
    nombre,

    getLugarnac,
    CreateLugarnac,
    accion,
  }
});
