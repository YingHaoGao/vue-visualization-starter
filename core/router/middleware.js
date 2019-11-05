/* eslint no-await-in-loop: 0, guard-for-in: 0, no-restricted-syntax: 0 */
import allMiddleware from '../.glob/middleware';

/**
 * 运行中间件
 * 返回可以是一个 Booble 或者 Promise
 * 如返回 true 或者 Promise.resolve 或者不返回任何内容，当做完成可继续执行。
 * 如果返回 false 或者 Promise.reject 或者触发一个Error 或者返回基础数据类型，将当成失败，不可继续执行往下内容。
 */
const before = {};
const after = {};
Object.keys(allMiddleware).forEach((key) => {
  const context = allMiddleware[key].default || allMiddleware[key];
  if (context.after) after[key] = context.after;
  if (context.before) before[key] = context.before;
  if (!context.after && !context.before) before[key] = context;
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
  const middlewareList = when === 'before' ? before : after;
  return async function run(middlewares, app, to, from, next) {
    let name = null;
    let middleware = null;
    const logs = {};
    try {
      for (const i in middlewares) {
        name = middlewares[i];
        middleware = middlewareList[name];
        // eslint-disable-next-line no-continue
        if (!middleware) continue;
        const final = await middleware(app, to, from, next);
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
        showMessage(app, e, '中间件执行错误！');
      }
      return false;
    } finally {
      console.group(`middleware ${when}`);
      console.table(logs);
      console.groupEnd();
    }
  };
};
export const runBeforeMiddleware = handler('before');
export const runAfterMiddleware = handler('after');
