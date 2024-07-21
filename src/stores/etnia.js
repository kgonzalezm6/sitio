import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useEtniaStore = defineStore('etnia', () => {
  let etnias = ref([]);
  let loading_etnias = ref(false);
  async function getEtnia() {
    loading_etnias.value = true;
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'persona/etnia')
      .then(response => {
        if (!response.data.error) {
          etnias.value = response.data;
        } else {
          global.setAlert('Ha ocurrido un error al cargar la información');
        }
      })
      .catch(err => {
        console.error(err)
        global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
      })
      .finally(()=>{
        loading_etnias.value= false;
      })
  };
  return {
    etnias,
    loading_etnias,

    getEtnia,
  }
});
