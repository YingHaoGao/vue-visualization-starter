import { LISTENERS, MIDDLEWARES } from '@/config';
import LoadingBar from '../components/LoadingBar';
import router from './instance';
import { runBeforeMiddleware, runAfterMiddleware } from './middleware';
import { loadListener } from './listener';

const solve = () => Promise.resolve();
let inited = false;
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const { app } = router;
  if (!inited) {
    // eslint-disable-next-line no-underscore-dangle
    if (!app._mounted) await solve();
    if (!await loadListener(LISTENERS, app, to, from, next)) {
      return;
    }
    inited = true;
  }
  app.showLoading('正在加载');
  if (!await runBeforeMiddleware(MIDDLEWARES, app, to, from, next)) {
    app.hideLoading();
    next(false);
    return;
  }
  LoadingBar.start();
  app.hideLoading();
  next();
});
/**
 * 路由前置解析守卫
 */
router.beforeResolve(async (to, from, next) => {
  const { app } = router;
  let middlewares = [];
  to.matched.forEach((matche) => {
    const { components } = matche;
    const { middleware } = components.default || components;
    if (middleware && middleware.length) middlewares = middlewares.concat(middleware);
  });
  if (middlewares.length) {
    if (!await runBeforeMiddleware(middlewares, app, to, from, next)) {
      LoadingBar.finish();
      app.hideLoading();
      next(false);
      return;
    }
  }
  app.hideLoading();
  next();
});
/**
 * 路由后置守卫
 */
router.afterEach((to, from) => {
  LoadingBar.finish();
  runAfterMiddleware(MIDDLEWARES, router.app, to, from);
  router.app.hideLoading();
});
export default router;
