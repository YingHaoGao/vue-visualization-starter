import Vue from 'vue';
import VueRouter from 'vue-router';
import { BASE_URL } from '@/config';
import routes from './routes';
import allRoutes from '../.glob/routes';
import { isArray, isObject } from '../util';

let moduleRoutes = [];
Object.keys(allRoutes).forEach((key) => {
  const route = allRoutes[key].default || allRoutes[key];
  if (isArray(route)) moduleRoutes = moduleRoutes.concat(route);
  else if (isObject(route) && route.path) moduleRoutes.push(route);
});
console.group('router');
console.table(moduleRoutes);
console.groupEnd();
Vue.use(VueRouter);

const router = new VueRouter({
  base: BASE_URL || '',
  routes: [...moduleRoutes, ...routes],
});

export default router;
