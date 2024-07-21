import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useGluteoStore = defineStore('gluteo', () => {
  let gluteos = ref([]);
  let loading_gluteos = ref(false);
  async function getGluteos() {
    loading_gluteos.value = true;
    const global = useGlobalStore();
    const response = await axios.get(
        import.meta.env.VITE_MY_BASE + 'persona/atributos')
      .then(response => {
        if (!response.data.error) {
          gluteos.value = response.data;
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
        loading_gluteos.value = false;
      })
  };
  return {
    gluteos,
    loading_gluteos,

    getGluteos,
  }
});
