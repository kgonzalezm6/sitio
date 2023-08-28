import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/Default.vue'
import Unauthorize from '../views/401-Unauthorize.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_MY_BASE),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      meta: { //COLOCAR ESTA PROPIEDAD PARA PROTEGER RUTA 
        auth : true
      },
      children : [
        {
          path: '/crud',
          name: 'crud',
          component: () => import('../views/Test.vue')
        },
      ]
    },
    {
      path: '/prueba',
      name: 'prueba',
      component: Layout,
    },
    
    {
      path: '/401-Unauthorize',
      name: '401-Unauthorize',
      component: Unauthorize,
      props: true
    }
  ]
})


router.beforeEach((to,from,next) => {

  const protectedRoutes = to.matched.some(route => route.meta.auth)

  if(protectedRoutes && !localStorage.getItem('nit')){
    next('/401-Unauthorize')
  }
  next()
  
})

export default router
