
<template>
<el-dialog :visible.sync="visible" class="preview-dialog" v-drag-dialog>
  <header slot="title">
    <span style="margin-right:20px">{{config.title || '未命名'}}</span>
    <el-switch
      v-model="isRealData"
      active-text="真实数据"/>
  </header>
  <section class="preview">
    <smart-item :config="config" :index=0 :mode="isRealData?'production':'development'"/>
  </section>
</el-dialog>
</template>

<script>
import SmartItem from '@/components/SmartItem';

export default {
  components: { SmartItem },
  data() {
    return {
      config: {},
      visible: false,
      isRealData: false,
    };
  },
  watch: {
    visible(val) {
      if (!val) this.config = {};
    },
  },
  mounted() {
  },
  methods: {
    open(item) {
      this.config = Object.assign({}, item);
      this.visible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.preview{
  height: 400px;
}
.preview-dialog{
  /deep/ {
    .el-dialog__body{
      padding: 0;
    }
  }
}
</style>
