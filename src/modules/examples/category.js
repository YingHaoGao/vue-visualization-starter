import { isArray } from '@/util';
import routes from './routes';

function recurData(data, basePath = '') {
  if (isArray(data)) {
    return data.map(item => recurData(item, basePath));
  }
  if (data.path.indexOf('/') === 0) basePath = data.path;
  else basePath += `/${data.path}`;
  if (data.children && data.children.length) {
    data.children = recurData(data.children, basePath);
  }
  return {
    path: basePath,
    title: data.meta.title,
    children: data.children && data.children.length ? data.children : null,
  };
}
const menu = recurData(routes);
export default isArray(menu) ? menu : [menu];
