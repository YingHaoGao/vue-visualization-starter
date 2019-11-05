/**
 * 视图mixin
 */
import modeMixin from './mode';

export default {
  mixins: [modeMixin],
  // 注入本视图实例
  provide() {
    return {
      view: this,
    };
  },
  props: {
    /**
     * 视图配置
     */
    config: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      loading: true,
      /**
       * 组件集
       */
      items: {
        config: [],
        layout: [],
      },
    };
  },
  methods: {
    setItems(items) {
      const {
        config,
        layout,
      } = items;
      let num = this.items.config.length - config.length;
      if (num > 0) {
        for (;num >= 0; num -= 1) {
          config.push({});
          layout.push({});
        }
      }

      this.items.config = config;
      this.items.layout = layout;
    },
  },
};
