import { Loading, MessageBox } from 'element-ui';
import http from 'core/http';
import router from 'core/router';
import store from 'core/store';
import { AUTH_PATH, CLIENT_ID, LOGIN_URL, LOGOUT_URL, LOGOUT_URL_API } from '@/config';

/**
 * 重定向去登录
 */
const login = (state) => {
  const queryData = {
    client_id: CLIENT_ID,
    response_type: 'code',
    state: encodeURIComponent(state || router.currentRoute.path),
    redirect_uri: AUTH_PATH,
  };
  if (/^http/.test(LOGIN_URL)) {
    queryData.redirect_uri = encodeURIComponent(`${window.location.origin}${window.location.pathname}#${AUTH_PATH}`);
  }
  const query = Object.keys(queryData).map(k => `${k}=${queryData[k]}`).join('&');
  const loginUrl = `${LOGIN_URL}${LOGIN_URL.indexOf('?') < 0 ? '?' : '&'}${query}`;
  if (store.state.token) {
    store.commit('clearToken');
  }
  if (/^http/.test(loginUrl)) window.location = loginUrl;
  else router.push(loginUrl);
};

/**
 * 退出登录
 * 清除用户凭证并重定向去统一用户平台退出
 */
const logout = async () => {
  await MessageBox.confirm('确定退出登录？', {
    type: 'info',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  });
  const href = window.location.href.replace(window.location.hash, '');
  const logoutUri = `${LOGOUT_URL}${encodeURIComponent(href)}`;
  Loading.service({ lock: true, text: '正在退出...' });
  if (store.state.token) {
    store.commit('clearToken');
    try {
      if (LOGOUT_URL_API) {
        await http.put(LOGOUT_URL_API);
      }
    } catch (e) {
      console.error(e);
    }
  }
  window.location = logoutUri;
};

export default function plugin() {
  if (plugin.installed) return;
  plugin.installed = true;
  router.login = login;
  router.logout = logout;
}
