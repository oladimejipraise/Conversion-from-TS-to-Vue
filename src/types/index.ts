import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/PublicLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/LandingPage.vue')
        },
        {
          path: 'login',
          component: () => import('@/pages/LoginPage.vue')
        },
        {
          path: 'signup',
          component: () => import('@/pages/SignupPage.vue')
        }
      ]
    },
    {
      path: '/app',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('@/pages/TodosPage.vue')
        },
        {
          path: 'todos/:id',
          component: () => import('@/pages/TodoDetailsPage.vue')
        }
      ]
    },
    {
      path: '/profile',
      component: () => import('@/pages/ProfilePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/NotFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }
})

export default router