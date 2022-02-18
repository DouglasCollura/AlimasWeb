import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

function auth(to, from, next) {
    if (localStorage.nombre) {
        next();
    }else if(sessionStorage.nombre){
      next();
    } else {
        next({ name: 'Login' });
    }
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'Main',
    beforeEnter:auth,
    component: () => import('../views/Main.vue')
  },
  {
    path: '/Notificaciones',
    beforeEnter:auth,
    name: 'Notificaciones',
    component: () => import('../views/Notificaciones.vue')
  },
  {
    path: '/Beneficios',
    beforeEnter:auth,
    name: 'Beneficios',
    component: () => import('../views/Beneficios.vue')
  },
  {
    path: '/Canjeados',
    beforeEnter:auth,
    name: 'Canjeados',
    component: () => import('../views/Canjeados.vue')
  },
  {
    path: '/Ayuda',
    beforeEnter:auth,
    name: 'Ayuda',
    component: () => import('../views/Ayuda.vue')
  },
  {
    path: '/Profile',
    beforeEnter:auth,
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/Canje/:id',
    name: 'Canje',
    component: () => import('../views/Canje.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
