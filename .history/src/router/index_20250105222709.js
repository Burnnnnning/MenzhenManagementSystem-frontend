import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/common/Layout.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import Doctor from '@/views/Doctor.vue'


const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/doctor',
    children: [
      {
        path: '/doctor',
        name: 'doctor',
        component: Doctor
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router