
<template>
<section class="container">
  <smart-view :config="config" :items="items" mode="development" />
</section>
</template>
<script>
import SmartView from '@/components/SmartView.js';
import { getViewConf } from '@/views';

export default {
  components: { SmartView },
  data() {
    return {
      config: {},
      items: {},
    };
  },
  created() {
    const config = getViewConf(this.$route.params.id);
    this.config = config;
  },
};
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
}
</style>
