import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'
import axios from 'axios';



export const useAuthStore = defineStore('auth', () => {

  const user = ref([])
  const roles = ref([])
  const permissions = ref([])
  const loadingPage = ref(false)
  const rolesApp = import.meta.env.VITE_MY_APPNAME

  function login() {
    loadingPage.value = true
    if(localStorage.getItem('nit')){
      axios.post('login',{
        nit: localStorage.getItem('nit')
      })
      .then(response => {
        if(!response.data.error){
          const res = response.data
          const role = response.data.roles.filter(role => role.app === rolesApp)

          delete res.roles
          res.roles = role.map(role => role.nombre)

          user.value = res
          roles.value = role.map(role => role.nombre)
          permissions.value = role.map(role => role.permissions.filter(permission => permission.id).map(permission => permission.nombre)).flat()
          
          loadingPage.value = false
        }else{
          console.error(response.data)
          router.push({name:'401-Unauthorize'})
        }

      })
      .catch(err => {
        console.error(err.response.data);
      })
    }
  }

  function checkPermission(el) {
    for (var key in this.permissions) {
      if (this.permissions.hasOwnProperty(key)) {
        var value = this.permissions[key];

        if (value === el) {
          return true;
        }

        if (typeof value === 'object' && checkPermission(el)) {
          return true;
        }
      }
    }

    return false;
  }


  return {
    user,
    roles,
    permissions,
    loadingPage,

    login,
    checkPermission,
  }
})
