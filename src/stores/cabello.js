import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useCabelloStore = defineStore('cabello', () => {
    let cabellos = ref([]);
    let loading_cabellos = ref(false);
    async function getCabello() {
        const global = useGlobalStore();
        loading_cabellos.value = true;
        const response = await axios.get(
            import.meta.env.VITE_MY_BASE + 'persona/cabello')
          .then(response => {
            if (!response.data.error) {
              cabellos.value = response.data;
            } else {
              console.log('Ha ocurrido un error al cargar la información');
            }
          })
          .catch(err => {
            console.error(err)
            console.log();
            global.setAlert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
          })
          .finally(()=>{
            loading_cabellos.value = true;
        })
      };
    return {
        cabellos,
        loading_cabellos,

        getCabello,
    }
});
