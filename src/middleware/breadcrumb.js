/**
 * 更新面包屑
 * @param {Object} route
 */
const updateBreadcrumb = ({ $store }, route) => {
  const breadcrumb = [];
  route.matched.forEach((record) => {
    const crumb = {
      path: record.path,
      name: record.name,
      title: record.meta.title || record.name || record.path,
    };
    Object.keys(route.params).forEach((param) => {
      crumb.path = crumb.path.replace(`:${param}`, route.params[param]);
    }, this);
    breadcrumb.push(crumb);
  });
  $store.commit('breadcrumb/replace', breadcrumb);
  return true;
};
export default {
  after: updateBreadcrumb,
};
