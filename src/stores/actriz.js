import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGlobalStore } from './global';
import { useAstrologiaStore } from './astrologia';
import { useCabelloStore } from './cabello';
import { useEtniaStore } from './etnia';
import { useLugarnacStore } from './lugarnac';
import { useNacionalidadStore } from './nacionalidad';
export const useActrizStore = defineStore('actriz', () => {
  let actrices = ref([]);
  let id = ref(0);
  let loading_actrices = ref(false);
  let loading_series = ref(false);
  const headers= [{
    title: 'ID',
    align: 'start',
    sort: true,
    key: 'id_actriz'
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
  const headers_series= [{
    title: 'ID',
    align: 'start',
    sort: true,
    key: 'serie.id_serie'
  },
  {
    title: 'NOMBRE SERIE',
    align: 'end',
    sort: true,
    key: 'serie.nombre'
  },
  {
    title: 'IMAGEN',
    align: 'end',
    sort: true,
    key: 'imagen'
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
  let oneactriz = ref([]);
  let series = ref([]);
  let actriz = ref(
    {
      'nombre' : '',
      'fechanac' : '',
      'instagram' : '',
      'twitter' : '',
      'foto' : '',
      'altura' : '',
      'cabello_id' : '',
      'etnia_id' : '',
      'nacionalidad_id' : '',
      'astrologia_id' : '',
      'lugarnac_id' : '',
      'gluteo_id' : '',
      'busto_id' : '',
      'gluteo' : '',
      'busto' : ''
    }
  );
  let union = ref(
    {
      'actriz_id' : '',
      'serie_id' : ''
    }
  );
  const tab = ref(['Tabla','Graficas'])
  let opcion_editar = ref(false);
  let opcion_nuevo = ref(false);
  let loading_update = ref(false);
  let loading_create = ref(false);
  let loading_join = ref(false);
  let errors = ref([]);
  let opcion_union = ref(false);
  async function getActriz(){
    const global = useGlobalStore();
        loading_actrices.value = true;
        const response = await axios.get(
            import.meta.env.VITE_MY_BASE + 'persona/actriz')
          .then(response => {
            if (!response.data.error) {
              actrices.value = response.data;
            } else {
              global.setAlert("Ha ocurrido un error al cargar la información");
            }
          })
          .catch(err => {
            console.error(err)
            console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
          .finally(()=>{
            loading_actrices.value = false;
        })
  }
  async function UpdatedActriz() {
    loading_update.value = true;
    const global = useGlobalStore();
    const response = await axios.put(
        import.meta.env.VITE_MY_BASE + 'persona/actriz/' + this.oneactriz.id_actriz, this.oneactriz)
      .then(response => {
        console.log(response.data);
        if (!response.data.error) {
          global.setAlert("Guardado", "success");
          setTimeout(() => {
            opcion_editar.value = false;
            this.getActriz();
            errors.value = [];
          }, 1000);
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información','danger');
          console.log(response.data.error);
        }
      })
      .catch(err => {
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err,'danger')
        errors.value = err.response.data.errors;
      })
      .finally(()=>{
        loading_update.value = false;
      })
  };
  async function CreateActriz() {
    loading_create.value = true;
    const global = useGlobalStore();
    console.log(oneactriz.value);
    actriz.value.twitter == '' ?? 'https://www.twitter.com';
    actriz.value.instagram == '' ?? 'https://www.instagram.com';

    const response = await axios.post(
        import.meta.env.VITE_MY_BASE + 'persona/actriz', actriz.value)
      .then(response => {

        if (!response.data.error) {

          global.setAlert(response.data.mensaje, response.data.color);
          setTimeout(() => {
            opcion_nuevo.value = false;
            this.getActriz();
            errors.value = [];
          }, 1000);
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información',response.data.color);
          console.log(response.data.error);
        }
      })
      .catch(err => {
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err,err.response.data.color)
        errors.value = err.response.data.errors;
      })
      .finally(()=>{
        loading_create.value = false;
      })
  };
  async function UnionActrizSerie() {
    loading_join.value = true;
    const global = useGlobalStore();
    console.log(union.value);
    const response = await axios.post(
        import.meta.env.VITE_MY_BASE + 'persona/actriz_serie', union.value)
      .then(response => {
        if (!response.data.error) {
          global.setAlert(response.data.mensaje, response.data.color);
          setTimeout(() => {
            opcion_union.value = false;
            this.getActriz();
            errors.value = [];
            union.value = [];
          }, 1000);
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información',response.data.color);
          console.log(response.data.error);
        }
      })
      .catch(err => {
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err,err.response.data.color)
        errors.value = err.response.data.errors;
      })
      .finally(()=>{
        loading_join.value = false;
      })
  };
  async function getActrizSerie(){
    const global = useGlobalStore();
        loading_series.value = true;
        const response = await axios.get(
            import.meta.env.VITE_MY_BASE + 'persona/actriz_serie/'+id.value)
          .then(response => {
            if (!response.data.error) {
              series.value = response.data.datos;
            } else {
              global.setAlert(response.data.mensaje,response.data.color);
            }
          })
          .catch(err => {
            console.error(err)
            console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
          .finally(()=>{
            loading_series.value = false;
        })
  }
  function open(item,type){
    oneactriz.value = item;
    const astrologia = useAstrologiaStore();
    const cabello = useCabelloStore();
    const etnia = useEtniaStore();
    const nacionalidad = useNacionalidadStore();
    const lugarnac = useLugarnacStore();
    switch (type) {
      case 1:
        opcion_editar.value = true;
        astrologia.getAstrologia();
        cabello.getCabello();
        etnia.getEtnia();
        nacionalidad.getNacionalidad();
        lugarnac.getLugarnac();
        break;
      case 2:
        
        break;
    
      default:
        break;
    }
  }
  return {
    actrices,
    actriz,
    series,
    union,
    loading_actrices,
    headers,
    oneactriz,
    opcion_editar,
    opcion_union,
    loading_update,
    errors,
    opcion_nuevo,
    loading_create,
    loading_join,
    id,
    loading_series,
    headers_series,
    tab,

    getActriz,
    open,
    UpdatedActriz,
    CreateActriz,
    UnionActrizSerie,
    getActrizSerie,
  }
});
