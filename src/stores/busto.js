import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useBustoStore = defineStore('busto', () => {
  let bustos = ref([]);
  let loading_bustos = ref(false);
  async function getBusto() {
    loading_bustos.value = true;
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'persona/atributos')
      .then(response => {
        if (!response.data.error) {
          bustos.value = response.data;
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
        loading_bustos.value = false;
      })
    }
  return {
    bustos,
    loading_bustos,

    getBusto,
  }
});
