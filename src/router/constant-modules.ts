import LayoutBase from '@/layout/base-layout.vue';
import { RouteRecordRaw } from 'vue-router';
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LayoutBase,
    redirect: '/default',
    children: [
      {
        path: '/default',
        name: 'Default',
        component: () => import('@/views/demo/dashboard/v-list.vue'),
        meta: {
          title: '首页',
          name: 'Default',
          icon: '',
          breadcrumb: ['首页'],
        },
      },
      {
        path: '/empty',
        name: 'Empty',
        component: () => import('@/views/no-fund/v-empty.vue'),
        meta: {
          title: '404',
          name: '404',
          icon: 'aaaa',
          breadcrumb: ['menu', 'empty'],
        },
      },
      {
        path: '/sys/user/view',
        name: 'ViewUser',
        component: () => import('@/views/sys/user/user-view.vue'),
        meta: {
          title: '查看一波',
          name: '查看一波',
          icon: '',
          breadcrumb: ['menu', 'empty', 'view'],
        },
        props:true,

      },







      {
        path: '/pcm/cust/view',
        name: 'ViewCust',
        component: () => import('@/views/pcm/cust/cust-view.vue'),
        meta: {
          title: '查看客户',
          name: '查看客户',
          icon: '',
          breadcrumb: ['menu', 'empty', 'view'],
        },
        props:true,

      },



      {
        path: '/pcm/ass-cust/ass',
        name: 'AssCust',
        component: () => import('@/views/pcm/ass-cust/ass-view.vue'),
        meta: {
          title: '分配客户',
          name: '分配客户',
          icon: '',
          breadcrumb: ['menu', 'empty', 'view'],
        },
        props:true,

      },


      {
        path: '/pcm/prod-own',
        name: 'prod',
        component: () => import('@/views/pcm/prod-own/prod-own-dialog.vue'),
        meta: {
          title: '饼图',
          name: '饼图',
          icon: '',
          breadcrumb: ['menu', 'empty', 'view'],
        },
        props:true,

      },



    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/v-login.vue'),
  },
  // {
  //   path: '/sys/user/view/:userId',
  //   name: 'ViewUser',
  //   component: () => import('@/views/sys/user/ass-view.vue'),
  //   // meta: {
  //   //   title: '查看一波',
  //   //   name: '查看一波',
  //   //   icon: '',
  //   //   breadcrumb: ['menu', 'empty', 'view'],
  //   // },
  //   props:true,
  //
  // },
];

export default constantRoutes;
