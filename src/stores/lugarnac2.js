// Utilities
import {
  defineStore
} from 'pinia'
import axios from 'axios'
export const useLugarnacStore = defineStore('lugarnac', {
  state: () => ({
    id: null,
    isEdit: false,
    isDelete:false,
    date: [],
    lugarnacimiento: [],
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
    async getLugarnac() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'lugarnac')
        .then(response => {
          if (response.data.mensaje == "Exito") {
            this.lugarnacimiento = response.data.data;
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
      if(type == 1){
        //edit
        this.isEdit = true;
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
    // async createSerie() {
    //   console.log(this.serie);
    //   const response = await axios.post(
    //     import.meta.env.VITE_MY_BASE + 'serie', this.serie)
    //     .then(response => {
    //       console.log(response);
    //       if (response.status == 200) {
    //         alert(response.data.data.mensaje)
    //         setTimeout(() => {
    //           this.isOpen = false;
    //           this.getSerie();
    //         }, 1000);
    //       } else {
    //         alert('Ha ocurrido un error al cargar la información');
    //       }
    //     })
    //     .catch(err => {
    //       alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
    //     })
    // },

  }
})