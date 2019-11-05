/**
 * -------------------------------
 * 基础配置
 * -------------------------------
 */
// 开发/生产标识: 生产环境: production,开发环境: development
export const ENV = process.env.NODE_ENV;
// 当前域名
export const HOST = window.location.host;
// 默认document<title>
export const DEFAULT_TITLE = '可视化系统';
// 项目名
export const PROJECT_NAME = '可视化系统';
// 基本URL
export const BASE_URL = '/';
// 首页路由路径
export const HOME_PATH = '/';

/**
 * -------------------------------
 * 接口相关配置
 * -------------------------------
 */
// API域名
export const API_HOST = window.location.origin;
// API基本URL
// export const API_BASE_URL = '/AUTH-WEB/';
export const API_BASE_URL = ENV === 'production' ? '/api-visualization-gateway/' : '/api-visualization-gateway/';
// 请求限时
export const API_REQUEST_TIMEOUT = 20000;

/**
 * -------------------------------
 * 系统流程相关配置
 * -------------------------------
 */
// 激活的模块列表
export const MODULE_LIST = [{
  title: '可视化管理系统',
  name: 'visual',
}, {
  title: '权限管理',
  name: 'roles',
}, {
  title: '范例',
  name: 'examples',
}];
// 默认加载的模块
export const MODULE_DEFAULT = '';
// 激活监听器列表,将在每次路由变化时
export const LISTENERS = ['accessToken', 'loadModuleSelector'];
// 激活中间件列表,将在每次路由变化时
export const MIDDLEWARES = ['loadModule', 'checkAuth', 'checkModule', 'documentTitle'];

/**
 * -------------------------------
 * 插件相关配置
 * -------------------------------
 */
// 日记保存接口
export const LOG = {
  url: `${BASE_URL}log`,
  delay: 30000,
  enable: false,
};
export const PERMISSION = {
  url: '/user_permission',
  enable: true,
};

/**
 * -------------------------------
 * 登录相关配置
 * -------------------------------
 */
// 身份识别KEY，接口请求时附带到Header
export const AUTH_KEY = 'bachelor_authorization';
// 登录后回调的路由路径
export const AUTH_PATH = `${BASE_URL}auth`;
// Token获取接口地址
// export const AUTH_URL = '/user/accesstoken'; // 本地模拟测试
export const AUTH_URL = `${API_HOST}${API_BASE_URL}/user/accesstoken`;
// 退出登录接口
// export const LOGOUT_URL_API = '/user/logout'; // 本地模拟测试
export const LOGOUT_URL_API = `${API_HOST}${API_BASE_URL}/user/logout`;
// PUP退出登录URL
// export const LOGOUT_URL = '/'; // 本地模拟测试
export const LOGOUT_URL = 'http://221.2.140.133:8600/user-asserver/logout?redirectUrl=';
// PUP登录基本URL
// export const LOGIN_URL = '/login'; // 本地模拟测试
export const LOGIN_URL = 'http://221.2.140.133:8600/user-asserver/authorize';
// (子)系统PUP登录标识，跳转至登录时附带
export const CLIENT_ID = 'd2065235cbfc404bbd24b94a2efec90b';
