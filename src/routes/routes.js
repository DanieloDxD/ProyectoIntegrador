import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Datos from 'src/pages/Datos.vue'
import Principal from 'src/pages/Principal.vue'
import Usuarios from 'src/pages/Usuarios.vue'
import Dispositivos from 'src/pages/Dispositivos.vue'
import Mapa from 'src/pages/Mapa.vue'

import Login from '../pages/Login.vue'


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      
      {
        path: 'Principal',
        name: 'Principal',
        component: Principal
      }, 
      {
        path: 'Datos',
        name: 'Datos',
        component: Datos
      },
      {
        path: 'Usuarios',
        name: 'Usuarios',
        component: Usuarios
      },
      
      {
        path: 'Dispositivos',
        name: 'Dispositivos',
        component: Dispositivos

        
        
      
      },
      {
        path: 'Mapa',
        name: 'Mapa',
        component: Mapa
      },
      
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
