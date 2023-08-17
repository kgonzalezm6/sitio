import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Default from '../layouts/Default.vue'
import DontAutorization from '../views/DontAuthorization.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_MY_BASE),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Default,
    },
    {
      path: '/dont-autorization',
      name: 'dontAutorization',
      component: DontAutorization,
      props: true
    }
  ]
})


router.beforeEach((to,from) => {

  // DESCOMENTARIAR PARA QUE SE PUEDA EJECUTAR EL CHEQUEO DE AUTORIZACION

  // const auth = useAuthStore()
  // auth.fetchAuth()

})

export default router
