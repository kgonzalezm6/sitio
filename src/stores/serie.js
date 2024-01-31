// Utilities
import {
  defineStore
} from 'pinia'
import axios from 'axios'
export const useSerieStore = defineStore('serie', {
  state: () => ({
    id:null,
    isOpen: false,
    date: [],
    datossiguiendo: [],
    datospendiente: [],
    datosfinalizado: [],
    total: null,
    tabla: false,
    serie: {
      NOMBRE_SERIE:'',
      FECHA_SERIE:'',
      SITIO_SERIE:'',
      ESTADO_SERIE:'',
      VISUALIZACION_SERIE:'',
      IMAGEN_SERIE:''
    },
    oneserie: [],
    tabs:[],
    temporadasepisodios:{},
    datosListos:false
  }),

  actions: {
    async getSerie() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'serie')
        .then(response => {
          if(response.data.mensaje == "Exito"){
           this.datossiguiendo = response.data.data.filter((serie) => serie.VISUALIZACION_SERIE === "1");
           this.datospendiente = response.data.data.filter((serie) => serie.VISUALIZACION_SERIE === "2");
           this.datosfinalizado = response.data.data.filter((serie) => serie.VISUALIZACION_SERIE === "3");
           
          }else{
            console.log('Ha ocurrido un error al cargar la información');
          }


        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async getOneSerie() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'serie/'+ this.id)
        .then(response => {
          if(response.data.mensaje == "Exito"){
          this.oneserie = response.data.data;
            this.tabs = [];
            this.temporadasepisodios = {};
            response.data.data.temporada.forEach((temporada) => {
              this.tabs.push({nombre: temporada.NOMBRE_TEMPORADA, episodios: temporada.episodio})
             
              this.datosListos = true;
            });
           console.log(this.tabs);
          }else{
            console.log('Ha ocurrido un error al cargar la información');
          }


        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async createSerie() {
      console.log(this.serie);
      const response = await axios.post(
        import.meta.env.VITE_MY_BASE + 'serie', this.serie)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            alert(response.data.data.mensaje)
            setTimeout(() => {
              this.isOpen = false;
              this.getSerie();
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