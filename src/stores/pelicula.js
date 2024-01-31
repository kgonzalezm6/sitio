// Utilities
import {
  defineStore
} from 'pinia'
import axios from 'axios'
import {
  useGlobalStore
} from './global'
export const usePeliculaStore = defineStore('pelicula', {
  state: () => ({
    id: null,
    isEdit: false,
    isNew: false,
    isDelete: false,
    isUnir: false,
    date: [],
    peliculas: [],
    total: null,
    tabla: false,
    pelicula: {
      NOMBRE_PELICULA: '',
      SITIO_PELICULA: '',
      ID_TIPO_PELICULA: '',
      ID_EMPRESA: ''
    },
    peliculachica: {
      chica: [],
      pelicula: ''
    },
    onepelicula: [],
    tabs : ['Chicas','Graficas'],
    chicas: [],
    temporadasepisodios: {},
    datosListos: false,
    headerschicas: [{
        title: 'ID',
        align: 'left',
        key: 'ID_CHICA',
        sort: true
      },
      {
        title: 'NOMBRE',
        align: 'left',
        key: 'NOMBRE_CHICA',
        sort: true
      },
      {
        title: 'FECHA DE NACIMIENTO',
        align: 'end',
        key: 'FECHANAC_CHICA'
      },
      {
        title: 'LUGAR DE NACIMIENTO',
        align: 'middle',
        key: 'lugarnac.NOMBRE_LUGARNAC'
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
        title: 'foto',
        align: 'middle',
        key: 'FOTO_CHICA'
      },
      {
        title: 'ESTADO',
        align: 'end',
        key: 'ESTADO_CHICA'
      },
      {
        title: 'ACCIONES',
        align: 'end',
        key: 'actions'
      }
    ],
    headers: [{
        title: 'ID',
        align: 'left',
        key: 'ID_PELICULA',
        sort: true
      },
      {
        title: 'NOMBRE pelicula',
        align: 'left',
        key: 'NOMBRE_PELICULA',
        sort: true
      },
      {
        title: 'tipo',
        align: 'end',
        key: 'tipo.NOMBRE_TIPO_PELICULA',
        sort: true
      },
      {
        title: 'FECHA',
        align: 'middle',
        key: 'FECHA_PELICULA',
        sort: true
      },
      {
        title: 'DISTRIBUIDORA',
        align: 'middle',
        key: 'empresa.NOMBRE_EMPRESA',
        sort: true
      },
      {
        title: 'ESTADO',
        align: 'middle',
        key: 'ESTADO_PELICULA',
        sort: false
      },
      {
        title: 'ACCIONES',
        align: 'middle',
        key: 'actions',
        sort: true
      }
    ],
  }),

  actions: {
    limpiar(objeto) {
      for (let propiedad in objeto) {
        if (objeto.hasOwnProperty(propiedad)) {
          objeto[propiedad] = '';
        }
      }
    },
    async getPelicula() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'pelicula')
        .then(response => {
          if (response.data.mensaje == "Exito") {
            this.peliculas = response.data.data;
          } else {
            console.log('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    open(item, type) {
      this.onepelicula = [];
      this.onepelicula = item;
      if (type == 1) {
        //view

      } else if (type == 2) {
        //edit
        this.isEdit = true;
      } else {
        this.isDelete = true;
      }
    },
    async getOnePelicula() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'pelicula/' + this.id)
        .then(response => {
          if (response.data.mensaje == "Exito") {
            this.onepelicula = response.data.data;
            // response.data.data.forEach(element => {
            //   this.peliculas = element.peliculas
            // });
            this.datosListos = true;
          } else {
            console.log('Ha ocurrido un error al cargar la información');
          }


        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async getPeliculaChica() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'peliculachica/' + this.id)
        .then(response => {
          if (response.data.mensaje == "Exito") {
            response.data.data.forEach(element => {           
              element.chicas.forEach(e =>{
                this.chicas.push(e);
              })
            });
          } else {
            console.log('Ha ocurrido un error al cargar la información');
          }


        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async UpdatePelicula() {
      const globalStore = useGlobalStore();
      const response = await axios.put(
          import.meta.env.VITE_MY_BASE + 'pelicula/' + this.onepelicula.ID_EMPRESA, this.onepelicula)
        .then(response => {
          if (response.status == 200) {
            globalStore.setAlert("Actualizado", "success");
            setTimeout(() => {
              this.isEdit = false;
              this.getPelicula();
            }, 1000);
          } else {
            alert('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async DeleteEmpresa() {
      const globalStore = useGlobalStore();
      const response = await axios.post(
          import.meta.env.VITE_MY_BASE + 'pelicula/delete/' + this.onepelicula.ID_EMPRESA)
        .then(response => {
          if (response.status == 200) {
            globalStore.setAlert("Eliminado exitosamente", "success");
            setTimeout(() => {
              this.isDelete = false;
              this.getEmpresa();
            }, 1000);
          } else {
            alert('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async CreatePelicula() {
      const globalStore = useGlobalStore();
      const response = await axios.post(
          import.meta.env.VITE_MY_BASE + 'pelicula', this.pelicula)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            globalStore.setAlert("Guardado", "success");
            setTimeout(() => {
              this.isNew = false;
              this.getPelicula();
              this.isUnir = true;
            }, 1000);
          } else {
            alert('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async UnirPelicula() {
      const globalStore = useGlobalStore();
    //   console.log(this.peliculachica);
      const response = await axios.post(
          import.meta.env.VITE_MY_BASE + 'peliculachica', this.peliculachica)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            globalStore.setAlert("Guardado", "success");
            setTimeout(() => {
              this.isUnir = false;
              this.limpiar(this.peliculachica);
            }, 1000);
          } else {
            alert('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    }
  }
})