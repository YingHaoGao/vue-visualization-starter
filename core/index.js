import Vue from 'vue';
import '@/plugins';
import '@/assets/styles/element-ui.scss';
import '@/assets/styles/index.scss';
import { requireContext } from './util';
/**
 * http服务资源
 */
import './http';
/**
 * http服务资源
 */
import app from './app';
/**
 * mock 数据
 */
Vue.config.productionTip = false;
/**
 * 动态引入自定义指令
 */
requireContext(require.context('../src/directive', false, /\.js$/), (name, context) => {
  Vue.directive(name, context.default || context);
});
/**
 * 动态引入自定义过滤器
 */
requireContext(require.context('../src/filter', false, /\.js$/), (name, context) => {
  Vue.filter(name, context.default || context);
});
app();
