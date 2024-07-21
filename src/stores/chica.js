import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
import {
  useAstrologiaStore
} from './astrologia';
import {
  useCabelloStore
} from './cabello';
import {
  useEtniaStore
} from './etnia';
import {
  useNacionalidadStore
} from './nacionalidad';
import {
  useLugarnacStore
} from './lugarnac';
import {
  useBustoStore
} from './busto';
import {
  useGluteoStore
} from './gluteo';
export const useChicaStore = defineStore('chica', () => {
    let chicas = ref([]);
    let loading_chicas = ref(false);
    let loading_update = ref(false);
    let loading_delete = ref(false);
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
    let  onechica = ref([]);
    let isEdit= ref(false);
    let isDelete= ref(false);

    async function getChica(){
        const global = useGlobalStore();
        loading_chicas.value = true;
        const response = await axios.get(
            import.meta.env.VITE_MY_BASE + 'persona/chica')
          .then(response => {
            if (!response.data.error) {
              chicas.value = response.data;
            } else {
              global.setAlert("Ha ocurrido un error al cargar la información");
            }
          })
          .catch(err => {
            console.error(err)
            console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
          .finally(()=>{
            loading_chicas.value = false;
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
      onechica.value = item;
      const astrologiaStore = useAstrologiaStore();
      const cabelloStore = useCabelloStore();
      const etniaStore = useEtniaStore();
      const nacionalidadStore = useNacionalidadStore();
      const lugarnacStore = useLugarnacStore();
      const bustoStore = useBustoStore();
      const gluteoStore = useGluteoStore();
      if (type == 1) {
        //edit
        isEdit.value = true;
        astrologiaStore.getAstrologia();
        cabelloStore.getCabello();
        etniaStore.getEtnia();
        nacionalidadStore.getNacionalidad();
        lugarnacStore.getLugarnac()
        bustoStore.getBusto();
        gluteoStore.getGluteos();
      } else if(type == 3) {
        //delete
        isDelete.value = true;
        astrologiaStore.getAstrologia();
        cabelloStore.getCabello();
        etniaStore.getEtnia();
        nacionalidadStore.getNacionalidad();
        lugarnacStore.getLugarnac()
        bustoStore.getBusto();
        gluteoStore.getGluteos();
      }
    };
    return {
        chicas,
        headers,
        loading_chicas,
        isEdit,
        isDelete,
        onechica,
        loading_update,
        loading_delete,
        
        getChica,
        open,
        UpdatedChica,
        DeleteChica,
    }
});
