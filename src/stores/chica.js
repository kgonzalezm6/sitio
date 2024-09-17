import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useStores } from '@/stores';
import { useRouter } from "vue-router"
export const useChicaStore = defineStore('chica', () => {
    const { global, astrologia, cabello, etnia, nacionalidad, lugarnac } = useStores();
    const router = useRouter();
    let chicas = ref([]);
    let loading_chicas = ref(false);
    let loading_chica = ref(false);
    let loading_update = ref(false);
    let loading_delete = ref(false);
    let loading_opcion = ref(false);
    const headers= [{
        title: 'ID',
        align: 'start',
        sort: true,
        key: 'id_chica'
      },
      {
        title: 'NOMBRE CHICA',
        align: 'end',
        sort: true,
        key: 'nombre'
      },
      {
        title: 'FECHA DE NACIMIENTO',
        align: 'middle',
        key: 'fechanac'
      },
      {
        title: 'LUGAR DE NACIMIENTO',
        align: 'middle',
        key: 'lugarnac.nombre'
      },
      {
        title: 'ETNIA',
        align: 'end',
        key: 'etnia.nombre'
      },
      {
        title: 'CABELLO',
        align: 'end',
        key: 'cabello.nombre'
      },
      {
        title: 'FOTO',
        align: 'middle',
        key: 'foto'
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
    const tabs = ['Registros','Estadisticas'];
    let chica = ref([]);
    let isEdit= ref(false);
    let isDelete= ref(false);
    let id = ref(null);
    async function getChica(){      
        const response = await axios.get('persona/chica')
          .then(response => {
            if (!response.data.error) {
              chicas.value = response.data;
              loading_chicas.value = true;
            } else {
              global.setAlert("Ha ocurrido un error al cargar la información");
            }
          })
          .catch(err => {
            console.error(err)
            console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
          .finally(()=>{
        })
    }
    async function getOne(){      
      const response = await axios.get('persona/chica/'+id.value)
        .then(response => {
          if (!response.data.error) {
            chica.value = response.data.datos[0];
            loading_chica.value = true;
          } else {
            global.setAlert("Ha ocurrido un error al cargar la información");
          }
        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
        .finally(()=>{
      })
  }
    async function UpdatedChica() {
      loading_update.value = true;
      const global = useGlobalStore();
      const response = await axios.put(
          import.meta.env.VITE_MY_BASE + 'persona/chica/' + this.onechica.id_chica, this.onechica)
        .then(response => {
          console.log(response.data);
          if (!response.data.error) {
            global.setAlert("Guardado", "success");
            setTimeout(() => {
              isEdit.value = false;
              this.getChica();
            }, 1000);
          } else {
            global.setAlert('Ha ocurrido un error al cargar la información','danger');
          }
        })
        .catch(err => {
          global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err,'danger')
        })
        .finally(()=>{
          loading_update.value = false;
        })
    };
    async function DeleteChica() {
      loading_delete.value = true;
      const global = useGlobalStore();
      const response = await axios.delete(
          import.meta.env.VITE_MY_BASE + 'persona/chica/' + this.onechica.id_chica, this.onechica)
        .then(response => {
          console.log(response.data);
          if (!response.data.error) {
            global.setAlert("Guardado", "success");
            setTimeout(() => {
              isDelete.value = false;
              this.getChica();
            }, 1000);
          } else {
            global.setAlert('Ha ocurrido un error al cargar la información','danger');
          }
        })
        .catch(err => {
          global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err,'danger')
        })
        .finally(()=>{
          loading_delete.value = false;
        })
    };
    function open(item, type) {
      loading_opcion.value = true;
      chica.value = item;
      switch (type) {
        case 1:
         
          break;
      
        default:
          loading_opcion.value = false;
          break;
      }

    };
    return {
        chicas,
        headers,
        loading_chicas,
        loading_chica,
        isEdit,
        isDelete,
        chica,
        id,
        loading_update,
        loading_delete,
        loading_opcion,
        tabs,

        getChica,
        getOne,
        open,
        UpdatedChica,
        DeleteChica,
    }
});
