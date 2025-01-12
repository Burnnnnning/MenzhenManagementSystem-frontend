import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/common/Layout.vue'
import Topology from '@/views/Topology.vue'
import Analysis from '@/views/Analysis.vue'
import Statistic from '@/views/Statistic.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import Doctor from '@/views/Doctor.vue'
import BasicData from '@/views/BasicData.vue'
import Optimization from '@/views/Optimization.vue'


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
      {
        path: '/analysis',
        name: 'analysis',
        component: Analysis
      },
      {
        path: '/statistic',
        name: 'statistic',
        component: Statistic
      },
      {
        path: '/topology',
        name: 'topology',
        component: Topology
      },
      {
        path: '/basic-data',
        name: 'basic-data',
        component: BasicData
      },
      {
        path: '/optimization',
        name: '/optimization',
        component: Optimization
      }
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