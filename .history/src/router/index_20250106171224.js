import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/common/Layout.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';
import Doctor from '@/views/Doctor.vue';
import Patient from '@/views/Patient.vue'; // 引入 Patient 组件
import Treatment from '@/views/Treatment.vue'; // 引入 Treatment 组件
import Drug from '@/views/Drug.vue'; // 引入 Drug 组件
import Charge from '@/views/Charge.vue'; // 引入 Charge 组件
import Personal from '@/views/Personal.vue'; // 引入 Personal 组件

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
      {
        path: '/treatment',
        name: 'treatment',
        component: Treatment, // 收费项目管理页面
      },
      {
        path: '/drug',
        name: 'drug',
        component: Drug, // 药品信息管理页面
      },
      {
        path: '/charge',
        name: 'charge',
        component: Charge, // 费用结算管理页面
      },
      {
        path: '/personal',
        name: 'personal',
        component: Personal, // 个人中心页面
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