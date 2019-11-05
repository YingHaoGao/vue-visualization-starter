/**
 * 组件mixin
 */
import elementResizeDetectorMaker from 'element-resize-detector';
import { debounce } from '@/util/throttle-debounce';
import modeMixin from './mode';

const erd = elementResizeDetectorMaker();

export default {
  mixins: [modeMixin],
  // 注入视图组件对象
  // inject: ['view'],
  props: {
    /**
     * 组件配置
     */
    config: {
      type: Object,
      default: {},
    },
    /**
     * 组件索引
     * 视图中管理
     */
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    config: {
      handler() {
        if (this.isProd) return;
        if (this.onReload) this.onReload();
      },
      deep: true,
    },
    mode() {
      if (this.onReload) this.onReload();
    },
  },
  mounted() {
    this.$nextTick(this._initResize);
  },
  methods: {
    _initResize() {
      if (!this.onResize) return;
      this.debounce = debounce(400, (element) => {
        if (element.offsetWidth !== this.lastW || element.offsetHeight !== this.lastH) {
          this.lastW = this.$el.offsetWidth;
          this.lastH = this.$el.offsetHeight;
          this.onResize();
        }
      });
      this.lastW = this.$el.offsetWidth;
      this.lastH = this.$el.offsetHeight;
      erd.listenTo(this.$el, this.debounce);
    },
  },
  beforeDestroy() {
    erd.removeListener(this.$el);
    if (this.debounce) this.debounce.cancel();
  },
};
