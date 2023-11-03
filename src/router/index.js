import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/Default.vue'
import Unauthorize from '../views/401-Unauthorize.vue'
import NotFound from '../views/404-Not-Found.vue'
import Prueba from '../views/Prueba.vue'



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
          path: 'crud',
          name: 'crud',
          component: () => import('../views/Test.vue')
        },
        {
          path: '/prueba',
          name: 'prueba',
          component: Prueba,
        },
        
      ]
    },
    {
      path: '/401-Unauthorize',
      name: '401-Unauthorize',
      component: Unauthorize,
      props: true
    },
    {
      path: '/404-page-not-found',
      name: '404-Not-Found',
      component: NotFound
    }
  ]
})


// router.beforeEach((to,from,next) => {

//   // const protectedRoutes = to.matched.some(route => route.meta.auth)

//   // if(protectedRoutes && !localStorage.getItem('nit')){
//   //   next('/401-Unauthorize')
//   // }
//   // next()

//     const allRoutes = router.getRoutes().map(route => route.path);
//     const pathRoute = to.path
//     if(!allRoutes.includes(pathRoute)){
//       next()
//     }
//     console.log(allRoutes.includes(pathRoute))
//     next('/404-page-not-found')
// })

export default router
