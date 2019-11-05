import Vue from 'vue';
import { LISTENERS } from '@/config';
import module from './mixins/module';
import { unloadListener } from './router/listener';

/**
 * 路由
 */
import router from './router';
/**
 * 数据仓库
 */
import store from './store';

export default function app() {
  new Vue({
    mixins: [module],
    router,
    store,
    created() {
    },
    async mounted() {
      window.onbeforeunload = (e) => {
        // e = window.event || e;
        unloadListener(LISTENERS, this);
        this.$destroy();
        // e.returnValue = ('确定离开当前页面吗？');
      };
    },
    methods: {
      showLoading(text) {
        this.hideLoading();
        this.loadingInstance = this.$loading({ lock: true, text });
      },
      hideLoading() {
        if (this.loadingInstance) this.loadingInstance.close();
      },
    },
    render: h => h('router-view'),
  }).$mount('#app');
}
