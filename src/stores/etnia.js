import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useEtniaStore = defineStore('etnia', () => {
  let etnias = ref([]);
  let loading_etnias = ref(true);
  let opcion_nuevo = ref(false);
  let opcion_editar = ref(false);
  let opcion_eliminar = ref(false);
  let etnia = ref([]);
  const headers= [{
    title: 'ID',
    align: 'start',
    sort: true,
    key: 'id_etnia'
  },
  {
    title: 'NOMBRE ETNIA',
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
  async function getEtnia() {
    
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'persona/etnia')
      .then(response => {
        if (!response.data.error) {
          etnias.value = response.data;
          loading_etnias.value = false;
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
        // loading_etnias.value= false;
      })
  };
  function opciones(item,option){
    etnia.value = item;
    switch (option) {
      case 1:
        opcion_editar.value = true;
        break;
      case 2:
        opcion_eliminar.value = true;
        break;
      case 3:
      
        break;
      default:
        break;
    }
  }
  return {
    etnias,
    loading_etnias,
    headers,
    etnia,
    opcion_nuevo,
    opcion_editar,
    opcion_eliminar,
    opciones,

    getEtnia,
  }
});
