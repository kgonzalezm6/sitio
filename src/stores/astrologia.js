import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useAstrologiaStore = defineStore('astrologia', () => {
  let astrologias = ref([]);
  let loading_astrologias = ref(false);
  async function getAstrologia() {
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'persona/astrologia')
      .then(response => {
        if (!response.data.error) {
          astrologias.value = response.data;
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
        loading_astrologias.value = false;
      })
  }
  return {
    astrologias,
    loading_astrologias,


    getAstrologia,
  }
});
