
<template>
<section class="box">
  <smart-item :config="config" mode="development" />
</section>
</template>
<script>
import { itemsConf } from '@/items';
import SmartItem from '@/components/SmartItem';

export default {
  components: { SmartItem },
  data() {
    return {
      config: {
        key: '',
      },
    };
  },
  created() {
    const itemKey = this.$route.params.id;
    if (itemsConf[itemKey]) {
      this.config = itemsConf[itemKey];
    }
  },
};
</script>
<style lang="scss" scoped>
.box{
  height: 300px;
}
</style>
