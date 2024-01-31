// Utilities
import {
  defineStore
} from 'pinia'
import axios from 'axios'
import {
  useGlobalStore
} from './global'
export const useEmpresaStore = defineStore('empresa', {
  state: () => ({
    id: null,
    isEdit: false,
    isNew: false,
    isDelete: false,
    date: [],
    empresas: [],
    total: null,
    tabla: false,
    empresa: {
      NOMBRE_EMPRESA: '',
      SITIO_EMPRESA: '',
      FOTO_EMPRESA: ''
    },
    oneempresa: [],
    tabs: [],
    peliculas: [],
    temporadasepisodios: {},
    datosListos: false,
    headerspeliculas: [{
        title: 'ID',
        align: 'left',
        key: 'ID_PELICULA',
        sort: true
      },
      {
        title: 'NOMBRE PELICULA',
        align: 'left',
        key: 'NOMBRE_PELICULA',
        sort: true
      },
      {
        title: 'TIPO',
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
        title: 'VISTO',
        align: 'middle',
        key: 'ESTADO',
        sort: true
      },
      {
        title: 'ACCIONES',
        align: 'middle',
        key: 'actions',
        sort: true
      }
    ],
    headers: [{
      title: 'ID',
      align: 'left',
      key: 'ID_EMPRESA',
      sort: true
    },
    {
      title: 'NOMBRE EMPRESA',
      align: 'left',
      key: 'NOMBRE_EMPRESA',
      sort: true
    },
    {
      title: 'SITIO',
      align: 'end',
      key: 'SITIO_EMPRESA',
      sort: true
    },
    {
      title: 'FOTO',
      align: 'middle',
      key: 'FOTO_EMPRESA',
      sort: true
    },
    {
      title: 'ESTADO',
      align: 'middle',
      key: 'ESTADO_EMPRESA',
      sort: true
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
    async getEmpresa() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'empresa')
        .then(response => {
          if (response.data.mensaje == "Exito") {
            this.empresas = response.data.data;
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
      this.oneempresa = [];
      this.oneempresa = item;
      if (type == 1) {
        //view

      } else if (type == 2) {
        //edit
        this.isEdit = true;
      } else {
        this.isDelete = true;
      }
    },
    async getOneEmpresa() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'empresa/' + this.id)
        .then(response => {
          if (response.data.mensaje == "Exito") {
            this.oneempresa = response.data.data[0];
            response.data.data.forEach(element => {
              this.peliculas = element.peliculas
            });;
            this.tabs = ['Peliculas','Graficas'];
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
    async UpdateEmpresa() {
      const globalStore = useGlobalStore();
      const response = await axios.put(
          import.meta.env.VITE_MY_BASE + 'empresa/' + this.oneempresa.ID_EMPRESA, this.oneempresa)
        .then(response => {
          if (response.status == 200) {
            globalStore.setAlert("Actualizado", "success");
            setTimeout(() => {
              this.isEdit = false;
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
    async DeleteEmpresa() {
      const globalStore = useGlobalStore();
      const response = await axios.post(
          import.meta.env.VITE_MY_BASE + 'empresa/delete/' + this.oneempresa.ID_EMPRESA)
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
    async CreateEmpresa() {
      const globalStore = useGlobalStore();
      const response = await axios.post(
          import.meta.env.VITE_MY_BASE + 'empresa', this.empresa)
        .then(response => {
          if (response.status == 200) {
            globalStore.setAlert("Guardado", "success");
            setTimeout(() => {
              this.isEdit = false;
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

  }
})