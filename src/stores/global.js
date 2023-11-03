import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useGlobalStore = defineStore('global', () => {

    // INICIO SIDEBAR
    //----------------------------------------
    const openSidebar = ref(true)
    
    function updateOpenSidebar () {
        openSidebar.value = !openSidebar.value
    }
    //----------------------------------------
    // FIN SIDEBAR

    // INICIO TITLE PAGE
    //----------------------------------------
    const titlePage = ref({
        title : 'Home',
        icon : 'fas fa-home',
        textColor : 'text-white',
        color : 'bg-blue-muni'
    })

    function changeTitlePage (title = 'Home',icon = 'fas fa-home',textColor = 'text-white',color = 'bg-blue-muni') {
        titlePage.value.title = title
        titlePage.value.icon = icon
        titlePage.value.textColor = textColor
        titlePage.value.color = color
    }   
    //----------------------------------------
    // FIN TITLE PAGE


    // INICIO ALERTA TOAST
    //----------------------------------------
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
    //----------------------------------------
    // FIN ALERTA TOAST


    return {
        openSidebar,
        updateOpenSidebar,

        titlePage,
        changeTitlePage,

        alert,
        setAlert,
    }
})