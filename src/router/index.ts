import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteLocationRaw
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdoptPetView from '@/views/AdoptPetView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminView from '@/views/AdminView.vue'
import { useAuthStore } from '@/stores/auth'
import NotFoundView from '@/views/NotFoundView.vue'
import LoadingView from '@/views/LoadingView.vue'
import BreedManageView from '@/views/BreedManageView.vue'

const RESTRICTNOTADMIN = (to: RouteLocationNormalized): RouteLocationRaw | undefined => {
  const authStore = useAuthStore()

  if (authStore.authValues.auth === 'loading') {
    return { name: 'loading', state: { from: to.fullPath } }
  }

  if (
    authStore.authValues.auth === false ||
    (authStore.authValues.auth === true && authStore.authValues?.role !== 'ADMIN')
  ) {
    return { name: 'notFound' }
  }
}

const RESTRICTGUEST = (to: RouteLocationNormalized): RouteLocationRaw | undefined => {
  const authStore = useAuthStore()

  if (authStore.authValues.auth === 'loading') {
    return { name: 'loading', state: { from: to.fullPath } }
  }

  if (authStore.authValues.auth === false) {
    return { name: 'login' }
  }
}

const RESTRICTAUTH = (to: RouteLocationNormalized): RouteLocationRaw | undefined => {
  const authStore = useAuthStore()

  if (authStore.authValues.auth === 'loading') {
    return { name: 'loading', state: { from: to.fullPath } }
  }

  if (authStore.authValues.auth === true) {
    return { name: 'home' }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/not-found',
      name: 'notFound',
      component: NotFoundView
    },
    {
      path: '/adopt-a-pet',
      name: 'adopt-a-pet',
      component: AdoptPetView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: RESTRICTAUTH
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: RESTRICTAUTH
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: RESTRICTNOTADMIN
    },
    {
      path: '/manage-breeds/:breed',
      name: 'manage-breeds',
      component: BreedManageView,
      beforeEnter: [
        RESTRICTNOTADMIN,
        (to) => {
          if (!(to.params.breed === 'DOG' || to.params.breed === 'CAT')) {
            return { name: 'notFound' }
          }
        }
      ]
    },
    {
      path: '/loading',
      name: 'loading',
      component: LoadingView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'notFound' }
    }
  ]
})

export default router
