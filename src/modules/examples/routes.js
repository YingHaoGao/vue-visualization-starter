export default {
  path: '/examples',
  meta: {
    title: '范例',
  },
  component: () => import('./pages/index.js'),
  redirect: '/examples/icon',
  children: [{
    path: 'icon',
    meta: {
      title: 'ICON',
    },
    component: () => import('./pages/Icon.vue'),
  }, {
    path: 'button',
    meta: {
      title: 'BUTTON',
    },
    component: () => import('./pages/Button.vue'),
  }, {
    path: 'message',
    meta: {
      title: 'message',
    },
    component: () => import('./pages/Message.vue'),
  }, {
    path: 'notify',
    meta: {
      title: 'notify',
    },
    component: () => import('./pages/Notification.vue'),
  }, {
    path: 'message-box',
    meta: {
      title: 'message-box',
    },
    component: () => import('./pages/MessageBox.vue'),
  }, {
    path: 'dialog',
    meta: {
      title: 'dialog',
    },
    component: () => import('./pages/Dialog.vue'),
  }, {
    path: 'tabs',
    meta: {
      title: 'tabs',
    },
    component: () => import('./pages/Tabs.vue'),
  }, {
    path: 'scrolltotop',
    meta: {
      title: 'ScrollToTop',
    },
    component: () => import('./pages/ScrollToTop.vue'),
  }, {
    path: 'drag-dialog',
    meta: {
      title: 'DragDialog',
    },
    component: () => import('./pages/DragDialog.vue'),
  }, {
    path: 'form',
    meta: {
      title: '表单',
    },
    component: () => import('./pages/Form.vue'),
  }],
};
