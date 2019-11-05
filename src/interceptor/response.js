import { Message, Notification, MessageBox } from 'element-ui';
import axios from 'axios';
import router from 'core/router';
/**
 * respone 拦截
 */
const responseStatusHandler = {
  401: () => {
    MessageBox.alert('接口没有权限访问', {
      type: 'error',
      closeOnPressEscape: false,
      confirmButtonText: '重新登录',
    }).then(() => {
      router.logout();
    });
  },
  402: () => {
    router.logout();
  },
  403: () => {
    router.logout();
  },
  404: () => {
    Notification.error({
      title: '错误',
      offset: 50,
      message: '当前应用不支持这个功能',
      // position: 'bottom-right',
    });
  },
};
axios.interceptors.response.use(
  response => response,
  (error) => { // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      const { status } = error.response;
      const handlerFunc = responseStatusHandler[status];
      if (handlerFunc) handlerFunc(`${error.response.data.code}: ${error.response.data.msg}`);
      else {
        Message.error({
          title: error.status,
          message: error.response.data.msg || error.response.data.message || error.message,
        });
      }
    }
    return Promise.reject(error);
  },
);
