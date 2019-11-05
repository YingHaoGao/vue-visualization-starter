import { MODULE_LIST, MODULE_DEFAULT } from '@/config';

/**
 * 加载模块
 * 首次加载时判断是否路由已匹配到相应模块，如果没有则加载默认模块，如上没有则加载模块列表
 */
function loadModule(app, to, from, next) {
  if (to.matched.some(route => route.path === '*')) {
    let defaultModule = 'modules';
    if (MODULE_LIST.length === 1) {
      defaultModule = MODULE_LIST[0].name;
    } else if (MODULE_DEFAULT) {
      defaultModule = MODULE_DEFAULT;
    }
    next(`/${defaultModule}`);
    return false;
  }
  return true;
}
function unloadModule() {
  localStorage.setItem('unload', true);
  return true;
}
export default {
  load: loadModule,
  unload: unloadModule,
};
