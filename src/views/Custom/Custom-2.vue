<template>
<section class="container">
  <el-row :gutter="20">
    <el-col :span="16"><div class="grid-content bg-purple-dark">
      <smart-item :config="items.config[0]" :index="0" :mode="mode"></smart-item>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-dark">
      <smart-item :config="items.config[1]" :index="1" :mode="mode"></smart-item>
    </div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><div class="grid-content bg-purple-dark"><smart-item :config="items.config[2]" :index="2" :mode="mode"></smart-item></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-dark"><smart-item :config="items.config[3]" :index="3" :mode="mode"></smart-item></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-dark"><smart-item :config="items.config[4]" :index="4" :mode="mode"></smart-item></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-dark"><smart-item :config="items.config[5]" :index="5" :mode="mode"></smart-item></div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content bg-purple-dark"><smart-item :config="items.config[6]" :index="6" :mode="mode"></smart-item></div></el-col>
    <el-col :span="16"><div class="grid-content bg-purple-dark"><smart-item :config="items.config[7]" :index="7" :mode="mode"></smart-item></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-dark"><smart-item :config="items.config[8]" :index="8" :mode="mode"></smart-item></div></el-col>
  </el-row>
</section>
</template>
<script>
import SmartItem from '@/components/SmartItem';
import viewMixin from '@/mixins/view';
import config from './Custom-2';

const createItems = () => {
  const items = {
    config: [],
    layout: [],
  };
  for(let i = 0; i < config.gridNumber; i += 1) {
    items.config.push({});
    items.layout.push({});
  }
  return items;
}
export default {
  config,
  mixins: [viewMixin],
  components: { SmartItem },
  data() {
    return {
      items: createItems(),
    };
  },
  computed: {
    style() {
      const style = {};
      if (this.config.maxWidth) {
        style.maxWidth = this.config.maxWidth + 'px';
      }
      if (this.config.minWidth) {
        style.minWidth = this.config.minWidth + 'px';
      }
      if (this.config.fixedWidth) {
        style.width = this.config.fixedWidth + 'px';
      }
      return style;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.container{
  padding: 15px;
}
.grid-content {
  border-radius: 4px;
  height: 400px;
  margin: 8px;
  background-color: #f9fafc;
  margin-bottom: 20px;
  position: relative;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>
