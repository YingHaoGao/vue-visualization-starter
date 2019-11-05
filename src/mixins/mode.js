/**
 * 模式mixin
 */
export default {
  props: {
    /**
     * 所处环境
     * development: 开发阶段
     * editor: 编辑阶段
     * production: 生产阶段
     */
    mode: {
      type: String,
      default: 'production',
    },
  },
  computed: {
    isDev() {
      return this.mode === 'development';
    },
    isProd() {
      return this.mode === 'production';
    },
    isEdit() {
      return this.mode === 'editor';
    },
  },
};
