/**
 * 组件壳mixin
 */
import '@/util/print';
import modeMixin from './mode';

export default {
  mixins: [modeMixin],
  props: {
    /**
     * 组件配置信息
     */
    config: {
      type: Object,
      default: {},
    },
  },
  computed: {
    item() {
      if (!this.$children.length) return {};
      return this.$children[0];
    },
  },
  methods: {
    onReload() {
      if (this.item.onReload) this.item.onReload();
    },
    onPrint() {
      $(this.$refs.printArea).printThis({
        loadCSS: '/print.css',
        printDelay: 0,
        canvas: true,
      });
      if (this.item.onPrint) this.item.onPrint();
    },
    onNext() {},
    onPrev() {},
  },
};
