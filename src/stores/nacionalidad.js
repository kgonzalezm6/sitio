import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'

export const useNacionalidadStore = defineStore('nacionalidad', () => {
  let nacionalidades = ref([]);
  let loading_nacionalidades = ref(true)
  async function getNacionalidad() {
    const global = useGlobalStore();
    
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'persona/nacionalidad')
      .then(response => {
        if (!response.data.error) {
          nacionalidades.value = response.data;
          loading_nacionalidades.value = false;
        } else {
          console.log();
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        console.log();
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err)
      })
      .finally(()=>{
        loading_nacionalidades.value = false;
      })
  }
  return {
    nacionalidades,
    loading_nacionalidades,


    getNacionalidad,
  }
});
