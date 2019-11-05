
<template>
<section>
  <div :class="$style.box">
    <smart-item-skin :config="config" mode="development" />
  </div>
</section>
</template>
<script>
import SmartItemSkin from '@/components/SmartItemSkin.js';
export default {
  components: { SmartItemSkin },
  data() {
    return {
      config: {
        skin: '',
      },
    };
  },
  created() {
    this.config.skin = this.$route.params.id;
  },
};
</script>
<style lang="scss" module>
.box{
  height: 300px;
  width: 50%;
  margin: 10px auto;
}
</style>
