import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

// 参与本地存储
const includeStorageState = [
  'token',
  'userinfo',
  'language',
  'sidebar',
  'header',
];
export const state = {
  isTokenRefreshing: false,
  token: '', // 用户凭证
  userinfo: {}, // 用户信息
  commonView: '', // 公共视图
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
  header: {
    opened: true,
    withoutAnimation: false,
  },
  language: 'zh',
  workbenchUrl: '',
};
export const getters = {
  isSuperAdmin(state) {
    return (state.userinfo.role && state.userinfo.role.indexOf('sys_admin') >= 0);
  },
};
export const mutations = {
  set(state, payload) {
    Object.keys(payload).forEach((k) => {
      Vue.set(state, k, payload[k]);
    });
  },
  /**
   * 清除用户凭证
   */
  clearToken(state) {
    state.token = '';
    state.userinfo = {};
  },
  /**
   * 设置用户凭证
   */
  setToken(state, payload) {
    state.token = payload.token;
    state.userinfo = payload.userinfo;
  },
  /**
   * 切换(关闭)公共视图
   */
  toggleCommonView(state, e) {
    let key = e.charAt(0).toUpperCase() + e.slice(1);
    key = state.commonView === key ? '' : key;
    state.commonView = key;
  },
  toggleSidebar(state) {
    state.sidebar.opened = !state.sidebar.opened;
  },
};
export const plugins = [createPersistedState({
  setState: (key, state, storage) => {
    const saved = {};
    Object.keys(state).filter(s => includeStorageState.includes(s)).forEach((k) => {
      saved[k] = state[k];
    });
    return storage.setItem(key, JSON.stringify(saved));
  },
})];
