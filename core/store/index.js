import Vue from 'vue';
import Vuex from 'vuex';
import allStore from '../.glob/store';

/**
 * 动态引入自定义过滤器
 */
let rootStore = {};
const modules = {};
Object.keys(allStore).forEach((key) => {
  const item = allStore[key].default || allStore[key];
  if (typeof item.namespaced === 'undefined') item.namespaced = true;
  if (key === 'index') rootStore = item;
  else modules[key] = item;
});

rootStore.strict = process.env.NODE_ENV !== 'production';
rootStore.modules = modules;
Vue.use(Vuex);
const store = new Vuex.Store(rootStore);
export default store;
