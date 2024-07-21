import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useLugarnacStore = defineStore('lugarnac', () => {
  let lugarnac = ref([]);
  let loading_lugarnac = ref(false);

  async function getLugarnac() {
    const global = useGlobalStore();
    loading_lugarnac.value = true;
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'persona/lugarnac')
      .then(response => {
        if (!response.data.error) {
          lugarnac.value = response.data;
        } else {
          console.log();
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        console.log();
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
        loading_lugarnac.value = false;
      })
  };
  return {
    lugarnac,
    loading_lugarnac,



    getLugarnac,
  }
});
