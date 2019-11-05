/* eslint no-param-reassign:0 */
import { requireContext, exchange, gatherComponentConf } from '@/util';

const items = {};
export const itemsConf = {};
requireContext(require.context('./', true, /\.vue$/), (name, context) => {
  name = exchange(name);
  const item = context.default || context;
  items[name] = item;
  itemsConf[name] = gatherComponentConf(item, name);
});
console.group('items');
console.table(itemsConf);
console.groupEnd();
export const getItemConf = (key) => {
  if (itemsConf[key]) return itemsConf[key];
  return null;
};
export default items;
