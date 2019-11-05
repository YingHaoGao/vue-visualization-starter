import { Message } from 'element-ui';
import { AUTH_KEY } from '@/config';
import axios from 'axios';
import store from 'core/store';
import { waitTokenRefresh } from './waitRequest';
function setHeaderToken(config) {
  if (!config.headers[AUTH_KEY] && store.state.token) {
    axios.defaults.headers.common[AUTH_KEY] = store.state.token;
    config.headers[AUTH_KEY] = store.state.token;
  }
}
/**
 * request 拦截
 */
axios.interceptors.request.use(async (config) => {
  setHeaderToken(config);
  if (store.state.isTokenRefreshing) {
    await waitTokenRefresh(config);
    setHeaderToken(config);
  }
  return config;
}, (error) => {
  Message.error({
    message: '加载超时',
  });
  Promise.reject(error);
});
