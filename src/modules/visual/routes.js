import Layout from '@/layouts/default/Index.vue';

export default {
  path: '/visual',
  meta: {
    title: '可视化管理系统',
  },
  component: () => import('./pages/index'),
  children: [
    {
      path: 'view/preview',
      meta: {
        title: '预览',
      },
      component: () => import('./pages/ViewPreview.vue'),
    },
    {
      path: 'view/share',
      component: () => import('./pages/ViewPreview.vue'),
    },
    {
      path: '',
      meta: {
        title: '可视化管理系统',
        requireAuth: true,
      },
      component: Layout,
      redirect: '/visual/myview/default',
      children: [
        {
          path: 'welcome',
          meta: {
            title: '可视化管理系统',
            code: 'get:/myview',
          },
          component: () => import('./pages/Welcome.vue'),
        },
        {
          path: 'view/:id?',
          meta: {
            title: '业务视图',
          },
          component: () => import('./pages/View.vue'),
        },
        {
          path: 'myview/:id?',
          meta: {
            title: '我的视图',
            code: 'get:/myview',
          },
          component: () => import('./pages/View.vue'),
        },
        {
          path: 'manage/myview',
          meta: {
            title: '我的视图管理',
            code: 'get:/myview',
          },
          component: () => import('./pages/ViewList.vue'),
        },
        {
          path: 'manage/view',
          meta: {
            title: '业务视图管理',
            code: 'get:/view',
          },
          component: () => import('./pages/ViewList.vue'),
        },
        {
          path: 'manage/item',
          meta: {
            title: '组件管理',
            code: 'get:/component',
          },
          component: () => import('./pages/ItemList/Index.vue'),
        },
        {
          path: 'manage/view/add',
          meta: {
            title: '添加视图',
            code: (app, to) => {
              if (to.query.type === 'view') {
                return app.$permission('post:/view');
              }
              return app.$permission('post:/myview');
            },
          },
          component: () => import('./pages/ViewEdit/Index.vue'),
        },
        {
          path: 'manage/view/:id',
          meta: {
            title: '视图编辑',
            code: (app, to) => {
              if (to.query.type === 'view') {
                return app.$permission('put:/view');
              }
              return app.$permission('put:/myview');
            },
          },
          component: () => import('./pages/ViewEdit/Index.vue'),
        },
        {
          path: 'dev/item/:id',
          meta: {
            title: '组件开发',
          },
          component: () => import('./pages/dev/Item.vue'),
        },
        {
          path: 'dev/view/:id',
          meta: {
            title: '视图模板开发',
          },
          component: () => import('./pages/dev/View.vue'),
        },
        {
          path: 'dev/itemskin/:id',
          meta: {
            title: '组件外壳开发',
          },
          component: () => import('./pages/dev/ItemSkin.vue'),
        },
        {
          path: '/roles',
          meta: {
            title: '角色管理',
            requireAuth: true,
          },
          component: () => import('../roleManage/pages/Index.vue'),
        },
        {
          path: 'error/401',
          meta: {
            title: '401没有权限',
          },
          component: () => import('@/layouts/error/401.vue'),
        },
        {
          path: '*',
          meta: {
            title: '404没有找到页面~',
          },
          component: () => import('@/layouts/error/404.vue'),
        },
      ],
    },
  ],
};
