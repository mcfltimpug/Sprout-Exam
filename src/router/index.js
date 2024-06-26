import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import DashboardView from '@/views/DashboardView.vue';
import NotFound from '@/views/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView,
      meta: { requiresGuest: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true },
      children : [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView 
        },
      ]
    },
    { path: '/:pathMatch(.*)', component: NotFound }
  ]
});


router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isAuthenticated');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } else if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});


export default router;
