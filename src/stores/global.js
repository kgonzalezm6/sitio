import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useGlobalStore = defineStore('global', () => {

    const alert = ref({
        message: '',
        type: '',
        title: ' A T E N C I O N '
    })

    function setAlert(message,type,title = ' A T E N C I O N '){
        alert.value.message = message
        alert.value.type = type
        alert.value.title = title
    }


    return {
        alert,
        setAlert,
    }
})