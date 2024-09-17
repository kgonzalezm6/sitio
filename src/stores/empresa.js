import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useGlobalStore } from './global';
export const useEmpresaStore = defineStore('empresa', () => {
  const global = useGlobalStore();
  const headers = ref([
    {
      title: 'ID',
      align: 'left',
      key: 'id_empresa',
    },
    {
      title: 'NOMBRE',
      align: 'left',
      key: 'nombre',
    },
    {
      title: 'SITIO',
      align: 'end',
      key: 'sitio',
    },
    {
      title: 'FOTO',
      align: 'middle',
      key: 'imagen',
    },
    {
      title: 'ESTADO',
      align: 'middle',
      key: 'estado',
    },
    {
      title: 'ACCIONES',
      align: 'middle',
      key: 'actions',
      sort: true
    }
  ]);
  let errors = ref([]);
  let id = ref(null);
  let registro = ref([]);
  let loading_registro = ref(false);
  let registros = ref([]);
  let loading_registros = ref(false);
  let loading_opciones = ref(false);
  let opcion_editar = ref(false);
  let opcion_nuevo = ref(false);
  let opcion_eliminar = ref(false);
  let btn_editar = ref(false);
  let btn_nuevo = ref(false);
  let btn_eliminar = ref(false);
  let imagen = ref(null);
  let nuevo = reactive({
    nombre : null,
    sitio : null
  })
  async function index(){   
    try {
      const response = await axios.get('persona/empresa')
      if (!response.data.error) {
        if(response.data.codigo == 1){
          registros.value = response.data.datos;
        }else{
          global.setAlert(response.data.mensaje,response.data.color);
        }
        loading_registros.value = true;
      } else {
      global.setAlert(response.data.mensaje,response.data.color);
    }
    } catch (error) {
      console.error(error)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + error,'danger');
    } finally {

    }   
  }
  async function show(){   
    try {
      const response = await axios.get('persona/empresa/'+id.value)
      if (!response.data.error) {
        if(response.data.codigo == 1){
          registro.value = response.data.datos;
        }else{
          global.setAlert(response.data.mensaje,response.data.color);
        }
        loading_registro.value = true;
      } else {
      global.setAlert(response.data.mensaje,response.data.color);
    }
    } catch (error) {
      console.error(error)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + error,'danger');
    } finally {

    }   
  }
  async function store(){ 
    btn_nuevo.value = true; 
    const formData = new FormData();
    formData.append('nombre', nuevo.nombre);
    formData.append('sitio', nuevo.sitio);
    // Verifica si el archivo está disponible y agrégalo al formData
    if (imagen.value) {
      formData.append('imagen', imagen.value); // El nombre debe ser "imagen"
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }

    try {
      const response = await axios.post('persona/empresa', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.data.error) {
        if(response.data.codigo == 1){
          global.setAlert(response.data.mensaje,response.data.color);
          this.index();
          opcion_nuevo.value = false;
          this.reset();
        }else{
          global.setAlert(response.data.mensaje,response.data.color);
        }
      } else {
      global.setAlert(response.data.mensaje,response.data.color);
    }
    } catch (error) {
        errors.value = error.response.data.errors;
        global.setAlert(error,'danger');
    } finally {
      btn_nuevo.value = false; 
    }   
  }
  async function update() { 
    btn_editar.value = true; 
    const formData = new FormData();
    formData.append('nombre', registro.value.nombre);
    formData.append('sitio', registro.value.sitio);
    // Verifica si el archivo está disponible y agrégalo al formData
    if (imagen.value) {
      formData.append('imagen', imagen.value); // El nombre debe ser "imagen"
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
    try {
      const response = await axios.post('persona/empresas/' + registro.value.id_empresa, formData);     
      if (response.data.error) {
        global.setAlert(response.data.mensaje, response.data.color);
      } else {
        if (response.data.codigo == 1) {
          global.setAlert(response.data.mensaje, response.data.color);
          this.index();
          opcion_editar.value = false;
          this.reset();
        } else {
          global.setAlert(response.data.mensaje, response.data.color);
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      errors.value = error.response?.data?.errors || 'Error desconocido';
      global.setAlert(error.response?.data?.mensaje || 'Error en la solicitud', 'danger');
    } finally {
      btn_editar.value = false; 
    }   
  }
  async function destroy() { 
    btn_eliminar.value = true; 
    try {
      const response = await axios.delete('persona/empresa/' + registro.value.id_empresa);     
      if (response.data.error) {
        global.setAlert(response.data.mensaje, response.data.color);
      } else {
        if (response.data.codigo == 1) {
          global.setAlert(response.data.mensaje, response.data.color);
          this.index();
          opcion_eliminar.value = false;
          this.reset();
        } else {
          global.setAlert(response.data.mensaje, response.data.color);
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      errors.value = error.response?.data?.errors || 'Error desconocido';
      global.setAlert(error.response?.data?.mensaje || 'Error en la solicitud', 'danger');
    } finally {
      btn_eliminar.value = false; 
    }   
  }
  function opciones(type, item = null) {
    registro.value = item;
    switch (type) {
      case 1:
        opcion_nuevo.value = true;
        break;
      case 2:
        opcion_editar.value = true;
        break;
      case 3:
        opcion_eliminar.value = true;
        break;
      default:
        break;
    }
    loading_opciones.value = true;
  };
  function reset() {
    btn_nuevo.value = false;
    btn_editar.value = false;
    btn_eliminar.value = false;
    loading_registro.value = false;
    nuevo.nombre = null;
    nuevo.sitio = null;
    nuevo.imagen = null;
  };
  return {
    errors,
    headers,
    registros,
    loading_registros,
    registro,
    loading_registro,
    loading_opciones,
    id,
    opcion_editar,
    opcion_nuevo,
    opcion_eliminar,
    btn_editar,
    btn_nuevo,
    btn_eliminar,
    nuevo,
    imagen,

    opciones,
    reset,
    index,
    show,
    store,
    update,
    destroy,
  };
});