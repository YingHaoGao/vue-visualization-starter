
<template>
<section class="" v-loading="loading">
  <smart-view v-if="showView" :config="config" mode="production" ref="view"/>
</section>
</template>
<script>
import SmartView from '@/components/SmartView';
export default {
  components: { SmartView },
  data() {
    return {
      config: {},
      showView: false,
      loading: true,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.$http.get(`/view/${this.$route.query.id}`).then(({ data }) => {
        if (data.status === 'OK') {
          try {
            const templateMeta = JSON.parse(data.data.templateMeta) || {};
            const components = JSON.parse(data.data.components) || {};
            delete data.data.templateMeta;
            delete data.data.components;
            this.config = Object.assign(templateMeta, data.data);
            this.showView = true;
            this.$nextTick(() => {
              this.$refs.view.items = components;
            })
          document.title = this.config.title;
          } catch (e) {
            throw new Error(e);
          }
        } else {
          this.$message.error('没有找到视图');
        }
      }).catch((e) => {
        this.$message.error(e);
      }).finally(() => {
        this.loading = false;
      });
      return;
    }
    const tmp = localStorage.getItem(`tmpview/${this.$route.query.type||'view'}`);
    if (!tmp) {
      this.$message.error('没有内容！');
      return;
    }
    const view = JSON.parse(tmp);
    this.config = view.config;
    this.$nextTick(() => {
      this.$refs.view.items = view.items;
    })
    this.showView = true;
    this.loading = false;
  },
};
</script>
<style lang="scss" scoped>
</style>
