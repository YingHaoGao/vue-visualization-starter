import adapter from '@/util/adapter';

const apis = {
  getOrganizations: { url: '/user_sys/orgs', method: 'get' },
  getDepts: { url : '/user_sys/depts', method: 'get'},
  getUsers: { url: '/users', method: 'get' },
  getRoles: { url: '/roles', method: 'get' },
  getRole: { url: '/role/:id', method: 'get' },
  deleteRole: { url: '/role/:id', method: 'delete' },
  updateRole: { url: '/role', method: 'put' },
  createRole: { url: '/role', method: 'post' },
  getRoleUsers: { url: '/role_user/:roleCode', method: 'get' },
  putRoleUsers: { url: '/role_user/:roleCode', method: 'put' },
  postRoleUsers: { url: '/role_user/:roleCode', method: 'post' },
  getPermissions: { url: '/permissions', method: 'get' },
  getRolePermissions: { url: '/role_permission/:roleCode', method: 'get' },
  updateRolePermissions: { url: '/role_permission/:roleCode', method: 'post' },

  getMenus: { url: '/menus', method: 'get' },
  getRoleMenu: { url: '/role_menu/:roleCode', method: 'get' },
  updateRoleMenu: { url: '/role_menu/:roleCode', method: 'post' },
};
export default adapter(apis);
