import Layout from '@/layouts/default/Index.vue';

export default {
  components: { Layout },
  render(createElement) {
    return createElement('layout', [createElement('router-view', {
      key: this.$route.path,
      style: {
        padding: '15px',
      },
    })]);
  },
};
