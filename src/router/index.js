import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layouts/Default.vue';
import MenuPrincipal from '../views/MenuPrincipal.vue';
import Persona from '../views/MenuPersona.vue';
import Chicas from '../views/Persona/Chicas.vue';
import Empresas from '../views/Persona/Empresas.vue';
import Peliculas from '../views/Persona/Peliculas.vue';
import Chica from '../views/Persona/Chica.vue';
import Unauthorize from '../views/401-Unauthorize.vue';
import NotFound from '../views/404-Not-Found.vue';
import Empresa from '../views/Persona/Empresa.vue';
import NuevoChica from '../components/modals/NuevoChica.vue';
import EditarChica from '../components/modals/EditarChica.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_MY_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: MenuPrincipal,
        },
        {
          path: 'persona',
          name: 'Persona',
          component: Persona,
        },
        {
          path: 'persona/chicas',
          name: 'Chicas',
          component: Chicas,
        },
        {
          path: 'persona/chicas/:id',
          name: 'Chica',
          component: Chica,
        },
        {
          path: 'persona/chicas/nuevo',
          name: 'NuevoChica',
          component: NuevoChica,
        },
        {
          path: 'persona/chicas/editar/:id',
          name: 'EditarChica',
          component: EditarChica,
        },
        {
          path: 'persona/empresas',
          name: 'Empresas',
          component: Empresas,
        },
        {
          path: 'persona/empresas/:id',
          name: 'Empresa',
          component: Empresa,
        },
        {
          path: 'persona/peliculas',
          name: 'Peliculas',
          component: Peliculas,
        },
      ],
    },
    {
      path: '/401-Unauthorize',
      name: '401-Unauthorize',
      component: Unauthorize,
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound,
    },
  ],
});

export default router;
