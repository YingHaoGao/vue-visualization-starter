import { AUTH_PATH } from '@/config';

export default [
  {
    path: '/modules',
    meta: {
      title: '模块选择',
      requireAuth: true,
    },
    component: () => import('@/moduleSelector/Index.vue'),
  }, {
    path: AUTH_PATH,
    name: AUTH_PATH,
    meta: {
      title: '登录中',
    },
  }, {
    path: '/401',
    name: '401',
    meta: {
      title: '401没有权限',
    },
    component: () => import('@/layouts//error/401.vue'),
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '404没有找到页面',
    },
    component: () => import('@/layouts/error/404.vue'),
  },
];
