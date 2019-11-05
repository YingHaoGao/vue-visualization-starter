import { PERMISSION } from '@/config';
import parseJWT from '@/util/parseJWT';
import { runPausedRequests } from '../interceptor/waitRequest';
// import { isArray } from '@/util';

// const solve = () => new Promise((resolve) => {
//   setTimeout(() => {
//     resolve();
//   }, 2000);
// });
async function loadPermission(app) {
  // await solve();
  // if (!PERMISSION.enable || app.$store.state.permission.actions.length) return true;
  app.showLoading('加载权限信息');
  const { data } = await app.$http.get(`${PERMISSION.url}/${app.$store.state.userinfo.user_code}`);
  if (data.status !== 'OK') throw new Error('权限请求错误！');
  const permission = data.data.map(v => v.objCode);
  app.$store.commit('permission/merge', permission);
  return true;
}
async function loadUserrole(app) {
  // await solve();
  // if (isArray(app.$store.state.userinfo.role) && app.$store.state.userinfo.role.length > 0) return true;
  app.showLoading('加载用户信息');
  const { data } = await app.$http.get(`/roles/${app.$store.state.userinfo.user_code}`);
  if (data.status !== 'OK') throw new Error('用户角色请求错误！');
  app.$store.commit('set', {
    userinfo: Object.assign({}, app.$store.state.userinfo, { role: data.data || [] }),
  });
  return true;
}
async function loadWorkbenchUrl(app) {
  const { data } = await app.$http.get('/user_sys/app/workbench/url');
  if (data.status !== 'OK') throw new Error('invlid');
  app.$store.commit('set', {
    workbenchUrl: data.data,
  });
  return true;
}

async function refreshToken(app) {
  try {
    app.$store.commit('set', {
      isTokenRefreshing: true,
    });
    const { data: { data: { token } } } = await app.$http.post('/user/refreshToken', null, {
      isInterceptor: false,
    });
    const userinfo = parseJWT(token);
    if (userinfo) {
      app.$store.commit('set', {
        token,
        userinfo,
        isTokenRefreshing: false,
      });
      runPausedRequests();
      setTimeout(() => refreshToken(app), userinfo.exp - new Date().getTime() - (1000 * 10));
    } else {
      app.$store.commit('set', {
        isTokenRefreshing: false,
      });
    }
  } catch (e) {
    console.error(e);
    app.$store.commit('set', {
      isTokenRefreshing: false,
    });
  }
}

/**
 * 检查当前路由是否需要授权访问
 */
const checkRequireAuth = to => to.matched.some(record => record.meta.requireAuth === true);
async function checkAuth(app, to) {
  if (checkRequireAuth(to)) {
    if (!app.$store.state.token) {
      app.$router.login(to.fullPath);
      return false;
    }
    try {
      if (checkAuth.inited) return true;
      const nowTime = new Date().getTime();
      const expireTime = app.$store.state.userinfo.exp;
      const limitTime = nowTime + (1000 * 10);
      if (nowTime + (1000 * 5) >= expireTime) {
        app.$router.login(to.fullPath);
      } else if (nowTime <= expireTime && limitTime >= expireTime) {
        await refreshToken(app);
      } else {
        setTimeout(() => refreshToken(app), expireTime - limitTime);
      }
      await Promise.all([
        loadUserrole(app),
        loadPermission(app),
        loadWorkbenchUrl(app),
      ]);
      checkAuth.inited = true;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
  return true;
}
export default {
  before: checkAuth,
};
