import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/common/Layout.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';
import Doctor from '@/views/Doctor.vue';
import Patient from '@/views/Patient.vue'; // 引入 Patient 组件

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/doctor', // 默认重定向到 /doctor
    children: [
      {
        path: '/doctor',
        name: 'doctor',
        component: Doctor, // 医生页面
      },
      {
        path: '/patient',
        name: 'patient',
        component: Patient, // 患者页面
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login, // 登录页面
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound, // 404 页面
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;