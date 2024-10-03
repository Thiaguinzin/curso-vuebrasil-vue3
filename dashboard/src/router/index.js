import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/Home/index.vue')
const Feedbacks = () => import('../views/Feedbacks')
const Credentials = () => import('../views/Credentials/index.vue')

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    component: Feedbacks,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: Credentials,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
