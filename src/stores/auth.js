import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import router from '../router'


export const useAuthStore = defineStore('auth', () => {

  const authUser = ref([])
  const roles = ref([])
  const permisos = ref([])
  


  function fetchAuth () {
    
      axios.post( import.meta.env.VITE_MY_URL_BASE + 'auth')
      .then( response => {
        router.push({ name: 'home' })
        authUser.value = response.data
        roles.value = response.data.roles.map(role => role.nombre)
        permisos.value = response.data.roles.map(role => role.permisos.filter(permiso => permiso.id)).flat().map(permiso => permiso.nombre)
      
      })
      .catch(err => {
        router.push({ name: 'dontAutorization' })
      })
      
    
  }


  function checkPermiso(elemento) {
    for (var clave in this.permisos) {
      if (this.permisos.hasOwnProperty(clave)) {
        var valor = this.permisos[clave];

        if (valor === elemento) {
          return true;
        }

        if (typeof valor === 'object' && checkPermiso(elemento)) {
          return true;
        }
      }
    }

    return false;
  }


  return {
    authUser,
    roles,
    permisos,

    checkPermiso,
    fetchAuth,
  }
})
