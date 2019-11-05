import { AUTH_KEY, HOME_PATH, AUTH_PATH, AUTH_URL } from '@/config';
import parseJWT from '@/util/parseJWT';

// const solve = () => new Promise((resolve) => {
//   setTimeout(() => {
//     resolve();
//   }, 2000);
// });
/**
 * 凭code获取accesstoken
 */
const fetchAccessToken = async (context, code) => {
  try {
    const { data } = await context.$http.get(AUTH_URL, {
      params: { code },
    });
    const { token } = data.data;
    const userinfo = parseJWT(token);
    if (userinfo) {
      context.$store.commit('setToken', {
        token,
        userinfo,
      });
      context.$http.defaults.headers.common[AUTH_KEY] = token;
      return Promise.resolve(true);
    }
    return Promise.resolve('解析JWT错误');
  } catch (e) {
    return Promise.resolve(e);
  }
};
/**
 * 检验是否登录回调中
 */
export default async function accessToken(context, to, from, next) {
  if (to.path !== AUTH_PATH) {
    return true;
  }
  const { code } = to.query;
  if (!code) {
    next(to.query.state || HOME_PATH);
    return false;
  }
  context.showLoading('登录中');
  // await solve();
  const done = await fetchAccessToken(context, code);

  if (done === true) {
    next(to.query.state || HOME_PATH);
    return false;
  }
  context.$confirm(done, '系统启动失败', {
    type: 'error',
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    confirmButtonText: '重新登录',
    cancelButtonText: '重试',
  }).then(() => {
    context.$router.login();
  }).catch(() => {
    window.location.reload();
  });
  return Promise.reject(done);
}
