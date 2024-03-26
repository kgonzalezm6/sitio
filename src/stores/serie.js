import { defineStore } from 'pinia';
import { ref } from 'vue'
export const useSerieStore = defineStore('serie', () => {
    const datossiguiendo = ref([]);
    const datospendiente = ref([]);
    const datosfinalizado = ref([]);
    let id = ref(0);
    let getloading = ref(false);
    let oneserie = ref([]);
    let tabs = ref([]);
    let serie = ref({
      NOMBRE_SERIE:'',
      FECHA_SERIE:'',
      SITIO_SERIE:'',
      ESTADO_SERIE:'',
      VISUALIZACION_SERIE:'',
      IMAGEN_SERIE:''
    });
    let datosListos = ref(false);
    let createloading = ref(false);
    let isOpen = ref(false);
      function limpiar(objeto) {
        for (let propiedad in objeto) {
          if (objeto.hasOwnProperty(propiedad)) {
            objeto[propiedad] = '';
          }
        }
      }
      async function getSerie() {
        getloading.value = true;
        const response = await axios.get(import.meta.env.VITE_MY_BASE + 'serie')
          .then(response => {
            if(response.data.mensaje == "Exito"){
             datossiguiendo.value = response.data.data.filter((serie) => serie.VISUALIZACION_SERIE === "1");
             datospendiente.value= response.data.data.filter((serie) => serie.VISUALIZACION_SERIE === "2");
             datosfinalizado.value = response.data.data.filter((serie) => serie.VISUALIZACION_SERIE === "3");         
            }else{
              console.log('Ha ocurrido un error al cargar la información');
            }
          })
          .catch(err => {
            console.error(err)
            console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
          .finally(() => {
            getloading.value = false;
          });
      }
      async function createSerie() {
        createloading.value = true;
        const response = await axios.post(
          import.meta.env.VITE_MY_BASE + 'serie', serie.value)
          .then(response => {
            if (response.status == 200) {
              alert(response.data.data.mensaje)
              setTimeout(() => {
                isOpen.value = false;
                this.getSerie();
              }, 1000);
            } else {
              alert('Ha ocurrido un error al cargar la información');
            }
          })
          .catch(err => {
            alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
          .finally(()=>{
            createloading.value = false;
          })
      }
      async function getOneSerie() {
        const response = await axios.get(
            import.meta.env.VITE_MY_BASE + 'serie/'+ id.value)
          .then(response => {
            if(response.data.mensaje == "Exito"){
            oneserie.value = response.data.data;
              tabs.value = [];
              this.temporadasepisodios = {};
              response.data.data.temporada.forEach((temporada) => {
                tabs.value.push({nombre: temporada.NOMBRE_TEMPORADA, episodios: temporada.episodio})
               
                datosListos.value = true;
              });
            }else{
              console.log('Ha ocurrido un error al cargar la información');
            }
  
  
          })
          .catch(err => {
            console.error(err)
            console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
      }
    return {
        datossiguiendo,
        datospendiente,
        datosfinalizado,
        tabs,
        oneserie,
        id,
        getloading,
        tabs,
        serie,
        datosListos,
        createloading,
        isOpen,

        limpiar,
        getSerie,
        createSerie,
        getOneSerie
    }
});
