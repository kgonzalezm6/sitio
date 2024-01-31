// Utilities
import {
  defineStore
} from 'pinia'
import axios from 'axios'
import { useAstrologiaStore } from './astrologia';
import { useCabelloStore } from './cabello';
import { useEtniaStore } from './etnia';
import { useNacionalidadStore } from './nacionalidad';
import { useLugarnacStore } from './lugarnac';
import { useBustoStore } from './busto';
import { useGluteoStore } from './gluteo';
export const useActrizStore = defineStore('actriz', {
  state: () => ({
    id: null,
    isEdit: false,
    isDelete:false,
    date: [],
    actrices: [],
    total: null,
    tabla: false,
    serie: {
      NOMBRE_SERIE: '',
      FECHA_SERIE: '',
      SITIO_SERIE: '',
      ESTADO_SERIE: '',
      VISUALIZACION_SERIE: '',
      IMAGEN_SERIE: ''
    },
    oneactriz: [],
    tabs: [],
    temporadasepisodios: {},
    datosListos: false,
    headers: [{
        title: 'ID',
        align: 'start',
        key: 'ID_ACTRIZ'
      },
      {
        title: 'NOMBRE ACTRIZ',
        align: 'end',
        key: 'NOMBRE_ACTRIZ'
      },
      {
        title: 'FECHA DE NACIMIENTO',
        align: 'end',
        key: 'FECHANAC_ACTRIZ'
      },
      {
        title: 'LUGAR DE NACIMIENTO',
        align: 'middle',
        key: 'LUGARNAC_ACTRIZ'
      },
      {
        title: 'ETNIA',
        align: 'end',
        key: 'etnia.NOMBRE_ETNIA'
      },
      {
        title: 'CABELLO',
        align: 'end',
        key: 'cabello.NOMBRE_CABELLO'
      },
      {
        title: 'FOTO',
        align: 'middle',
        key: 'FOTO_ACTRIZ'
      },
      {
        title: 'ESTADO',
        align: 'end',
        key: 'ESTADO_ACTRIZ'
      },
      {
        title: 'ACCIONES',
        align: 'end',
        key: 'actions'
      }
    ],
  }),

  actions: {
    async getActriz() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'actriz')
        .then(response => {
          if (response.data.mensaje == "Exito") {
            this.actrices = response.data.data;
          } else {
            console.log('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    open(item,type){
      this.oneactriz = item;
      const astrologiaStore = useAstrologiaStore();
      const cabelloStore = useCabelloStore();
      const etniaStore = useEtniaStore();
      const nacionalidadStore = useNacionalidadStore();
      const lugarnacStore = useLugarnacStore();
      const bustoStore = useBustoStore();
      const gluteoStore = useGluteoStore();
      if(type == 1){
        //edit
        this.isEdit = true;
        astrologiaStore.getAstrologia();
        cabelloStore.getCabello();
        etniaStore.getEtnia();
        nacionalidadStore.getNacionalidad();
        lugarnacStore.getLugarnac();
        bustoStore.getBusto();
        gluteoStore.getGluteos();
      }else{
        //delete
        this.isDelete = true;
      }
    },
    // async getOneSerie() {
    //   const response = await axios.get(
    //       import.meta.env.VITE_MY_BASE + 'serie/'+ this.id)
    //     .then(response => {
    //       if(response.data.mensaje == "Exito"){
    //       this.oneserie = response.data.data;
    //         this.tabs = [];
    //         this.temporadasepisodios = {};
    //         response.data.data.temporada.forEach((temporada) => {
    //           this.tabs.push({nombre: temporada.NOMBRE_TEMPORADA, episodios: temporada.episodio})

    //           this.datosListos = true;
    //         });
    //        console.log(this.tabs);
    //       }else{
    //         console.log('Ha ocurrido un error al cargar la información');
    //       }


    //     })
    //     .catch(err => {
    //       console.error(err)
    //       console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
    //     })
    // },
    async UpdatedActriz() {
      const response = await axios.put(
        import.meta.env.VITE_MY_BASE + 'actriz/'+this.oneactriz.ID_ACTRIZ, this.oneactriz)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            console.log();
            alert(response.data.data.mensaje)
            setTimeout(() => {
              this.isEdit = false;
              this.getActriz
            }, 1000);
          } else {
            alert('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },

  }
})