import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/Default.vue'
import Unauthorize from '../views/401-Unauthorize.vue'
import NotFound from '../views/404-Not-Found.vue'
import Empresa from '../views/EmpresaView.vue'
import Pelicula from '../views/PeliculaView.vue'
import Chica from '../views/ChicaView.vue'
import Actriz from '../views/ActricesView.vue'
import Serie from '../views/SerieView.vue'
import EmpresaDetalle from '../views/EmpresaDetalleView.vue'
import PeliculaDetalle from '../views/PeliculaDetalleView.vue'
import ChicaDetalle from '../views/ChicaDetalleView.vue'
import MenuPrincipal from '../views/MenuPrincipal.vue'
import MenuPersona from '../views/MenuPersona.vue'
import SerieMenu from '../views/Serie.vue'
import Portfolio from '../views/Portfolio.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_MY_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Layout,
      meta: { //COLOCAR ESTA PROPIEDAD PARA PROTEGER RUTA 
        auth : true
      },
      children : [
        // {
        //   path: '',
        //   name: '',
        //   component: MenuPrincipal
        // },
        // {
        //   path: 'menupersona',
        //   name: 'MenuPersona',
        //   component: MenuPersona
        // },
        // {
        //   path: 'serie',
        //   name: 'Serie',
        //   component: SerieMenu
        // },
        // {
        //   path: 'empresa',
        //   name: 'Home',
        //   component: Empresa
        // },
        // {
        //   path: 'pelicula',
        //   name: 'Pelicula',
        //   component: Pelicula
        // },
        // {
        //   path: 'chica',
        //   name: 'Chica',
        //   component: Chica
        // },
        // {
        //   path: '/empresa/:id',
        //   name: 'empresadetalle',
        //   component: EmpresaDetalle
        // },
        // {
        //   path: '/pelicula/:id',
        //   name: 'peliculadetalle',
        //   component: PeliculaDetalle
        // },
        // {
        //   path: '/chica/:id',
        //   name: 'chicadetalle',
        //   component: ChicaDetalle
        // }
        
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
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


// router.beforeEach((to,from,next) => {

//   const protectedRoutes = to.matched.some(route => route.meta.auth)

//   if(protectedRoutes && !localStorage.getItem('nit')){
//     next('/401-Unauthorize')
//   }
//   next()
// })

export default router
