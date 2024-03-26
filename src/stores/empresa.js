import { defineStore } from 'pinia';
import { ref, axios, useGlobalStore, peticion } from '../functions/basic';
export const useEmpresaStore = defineStore('empresa', () => {
    const id = ref(null);
    const isEdit= ref(false);
    const isNew= ref(false);
    const isDelete= ref(false);
    const date= ref([]);
    const empresas= ref([]);
    const total= ref(null);
    const tabla= ref(false);
    const empresa= ref({
      NOMBRE_EMPRESA: '',
      SITIO_EMPRESA: '',
      FOTO_EMPRESA: ''
    });
    const oneempresa= ref([]);
    const tabs = ref([]);
    const peliculas = ref([]);
    const temporadasepisodios = ref({});
    const datosListos = ref(false);
    const headerspeliculas = ref([{
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
    ]);
    const headers = ref([{
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
    ]);
    async function getEmpresa() {
        peticion(import.meta.env.VITE_MY_BASE + 'empresa', 'GET')
        .then(response => {
            if (response.mensaje == "Exito") {
                    empresas.value = response.data;
                } else {
                    console.log('Ha ocurrido un error al cargar la información');
                }
        })
        .catch(error => {
            // Manejo de errores aquí
            console.error('Error en la solicitud:', error);
        });
      };
      function open(item, type) {
        oneempresa.value = [];
        oneempresa.value = item;
        if (type == 1) {
          //view
  
        } else if (type == 2) {
          //edit
          isEdit.value = true;
        } else {
          isDelete.value = true;
        }
      };
      async function getOneEmpresa() {
        const response = await axios.get(
            import.meta.env.VITE_MY_BASE + 'empresa/' + id.value)
          .then(response => {
            if (response.data.mensaje == "Exito") {
              oneempresa.value = response.data.data[0];
              response.data.data.forEach(element => {
                peliculas = element.peliculas
              });;
              tabs.value = ['Peliculas','Graficas'];
              datosListos.value = true;
            } else {
              console.log('Ha ocurrido un error al cargar la información');
            }
  
  
          })
          .catch(err => {
            console.error(err)
            console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
      };
      async function UpdateEmpresa() {
        const globalStore = useGlobalStore();
        const response = await axios.put(
            import.meta.env.VITE_MY_BASE + 'empresa/' + oneempresa.value.ID_EMPRESA, oneempresa.value)
          .then(response => {
            if (response.status == 200) {
              globalStore.setAlert("Actualizado", "success");
              setTimeout(() => {
                isEdit.value = false;
                this.getEmpresa();
              }, 1000);
            } else {
              alert('Ha ocurrido un error al cargar la información');
            }
          })
          .catch(err => {
            alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
      };
      async function DeleteEmpresa() {
        const globalStore = useGlobalStore();
        const response = await axios.post(
            import.meta.env.VITE_MY_BASE + 'empresa/delete/' + oneempresa.value.ID_EMPRESA)
          .then(response => {
            if (response.status == 200) {
              globalStore.setAlert("Eliminado exitosamente", "success");
              setTimeout(() => {
                isDelete.value = false;
                this.getEmpresa();
              }, 1000);
            } else {
              alert('Ha ocurrido un error al cargar la información');
            }
          })
          .catch(err => {
            alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
      };
      async function CreateEmpresa() {
        const globalStore = useGlobalStore();
        const response = await axios.post(
            import.meta.env.VITE_MY_BASE + 'empresa', empresa.value)
          .then(response => {
            if (response.status == 200) {
              globalStore.setAlert("Guardado", "success");
              setTimeout(() => {
                isEdit.value = false;
                this.getEmpresa();
              }, 1000);
            } else {
              alert('Ha ocurrido un error al cargar la información');
            }
          })
          .catch(err => {
            alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
      };
    return {
       id,
       isEdit,
       isNew,
       isDelete,
       date,
       empresas,
       total,
       tabla,
       empresa,
       oneempresa,
       tabs,
       peliculas,
       temporadasepisodios,
       datosListos,
       headerspeliculas,
       headers, 


       getEmpresa,
       open,
       getOneEmpresa,
       UpdateEmpresa,
       DeleteEmpresa,
       CreateEmpresa
    }
});
