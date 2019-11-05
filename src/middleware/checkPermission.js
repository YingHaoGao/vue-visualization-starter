import { isFunction } from '@/util';

/**
 * 检查当前路由是否需要授权访问
 */
const checkRequireAuth = to => to.matched.some(record => record.meta.requireAuth === true);
function checkPermission(app, to) {
  if (!checkRequireAuth(to)) return true;
  if (!app.$store.state.token) {
    app.$router.login(to.fullPath);
    return false;
  }
  const { allow } = app.$store.state.category;
  if (app.$store.getters.isSuperAdmin) return true; // 判断是否高级管理员
  if (allow.indexOf(to.path) >= 0) return true; // 判断是否menu里有该项
  if (to.meta && to.meta.code) { // 判断路由是否有配置code
    if (isFunction(to.meta.code)) {
      if (to.meta.code(app, to)) return true;
    } else if (app.$permission.some(to.meta.code)) return true;
  }
  // app.$alert('没有权限访问', '提示', {
  //   confirmButtonText: '确定',
  //   showClose: false,
  // });
  app.$confirm('没有权限访问', {
    type: 'error',
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    confirmButtonText: '确定',
    cancelButtonText: '重试',
  }).then(() => {
  }).catch(() => {
    window.location.reload();
  });
  return false;
}
export default {
  before: checkPermission,
};
