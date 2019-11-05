/* eslint no-param-reassign:0 */
import { requireContext, exchange } from '@/util';

const itemSkins = {};
requireContext(require.context('./', true, /\.vue$/), (name, context) => {
  name = exchange(name);
  itemSkins[name] = context.default || context;
});
console.group('item skins');
console.table(itemSkins);
console.groupEnd();

export default itemSkins;
