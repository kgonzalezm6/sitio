import { defineStore } from 'pinia';
import axios from 'axios'
import { ref } from 'vue';
import { useGlobalStore } from './global'
export const useCabelloStore = defineStore('cabello', () => {
    let cabellos = ref([]);
    let loading_cabellos = ref(true);
    async function getCabello() {
        const global = useGlobalStore();
        
        const response = await axios.get(
            import.meta.env.VITE_MY_BASE + 'persona/cabello')
          .then(response => {
            if (!response.data.error) {
              cabellos.value = response.data;
              loading_cabellos.value = false;
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
        })
      };
    return {
        cabellos,
        loading_cabellos,

        getCabello,
    }
});
