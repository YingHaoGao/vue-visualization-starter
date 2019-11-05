
/**
 * 加载模块
 * 首次加载时判断是否路由已匹配到相应模块，如果没有则加载默认模块，如上没有则加载模块列表
 */
async function checkModule(app, to) {
  const { path } = to.matched[0];
  let moduleName = '';
  path.split('/').some((sub) => {
    if (sub) {
      moduleName = sub;
      return true;
    }
    return false;
  });
  if (moduleName) await app.loadModule(moduleName);
  return true;
}
export default {
  before: checkModule,
};
