/* eslint no-await-in-loop: 0, guard-for-in: 0, no-restricted-syntax: 0 */
import allListener from '../.glob/listener';

/**
 * 运行中间件
 * 返回可以是一个 Booble 或者 Promise
 * 如返回 true 或者 Promise.resolve 或者不返回任何内容，当做完成可继续执行。
 * 如果返回 false 或者 Promise.reject 或者触发一个Error 或者返回基础数据类型，将当成失败，不可继续执行往下内容。
 */
const load = {};
const unload = {};
Object.keys(allListener).forEach((key) => {
  const context = allListener[key].default || allListener[key];
  if (context.load) load[key] = context.load;
  if (context.unload) unload[key] = context.unload;
  if (!context.load && !context.unload) load[key] = context;
});
const showMessage = (app, message, title) => {
  app.$confirm(message.message || message, title, {
    type: 'error',
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    confirmButtonText: '重新登录',
    cancelButtonText: '重试',
  }).then(() => {
    app.$router.login();
  }).catch(() => {
    window.location.reload();
  });
};
const handler = (when) => {
  const listenerList = when === 'load' ? load : unload;
  return async function run(listeners, app, to, from, next) {
    let name = null;
    let listener = null;
    const logs = {};
    try {
      for (const i in listeners) {
        name = listeners[i];
        listener = listenerList[name];
        // eslint-disable-next-line no-continue
        if (!listener) continue;
        const final = await listener(app, to, from, next);
        if (final === false) {
          logs[name] = final;
          throw final;
        }
        logs[name] = final;
      }
      return true;
    } catch (e) {
      console.error(e);
      logs[name] = e;
      if (typeof e !== 'boolean') {
        showMessage(app, e, '监听器运行错误！');
      }
      return false;
    } finally {
      console.group('listeners');
      console.table(logs);
      console.groupEnd();
    }
  };
};
export const loadListener = handler('load');
export const unloadListener = handler('unload');
