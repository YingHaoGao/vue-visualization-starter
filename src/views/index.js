/* eslint no-param-reassign:0 */
import { requireContext, exchange, gatherComponentConf } from '@/util';

const views = {};
export const viewsConf = {};
requireContext(require.context('./', true, /\.vue$/), (name, context) => {
  name = exchange(name).toLowerCase();
  const view = context.default || context;
  views[name] = view;
  viewsConf[name] = gatherComponentConf(view, name, 'templateKey');
});
console.group('views');
console.table(viewsConf);
console.groupEnd();
export const getViewConf = (key) => {
  key = key.toLowerCase();
  if (viewsConf[key]) return viewsConf[key];
  return null;
};
export default views;
