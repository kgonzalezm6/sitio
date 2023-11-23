import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/Default.vue'
import Unauthorize from '../views/401-Unauthorize.vue'
import NotFound from '../views/404-Not-Found.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_MY_BASE),
  routes: [
    {
      path: '/',
      name: '',
      component: Layout,
      meta: { //COLOCAR ESTA PROPIEDAD PARA PROTEGER RUTA 
        auth : true
      },
      children : [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue')
        },
        {
          path: 'test',
          name: 'Test',
          component: () => import('../views/Test.vue')
        }
        
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/401-Unauthorize',
      name: '401-Unauthorize',
      component: Unauthorize,
    },
    {
      //MANEJA TODAS LAS PAGINAS QUE NO EXISTEN Y LA REDIRIJE AL 404 NOT FOUND
      path: '/:catchAll(.*)',
      component: NotFound,
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
