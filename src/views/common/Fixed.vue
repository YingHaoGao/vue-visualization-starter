<template>
<section :style="backgroundColor" class="container" :class="mode" ref="container">
  <div class="container" style="position: relative;" :style="style">
    <vue-draggable-resizable v-for="(item,index) in items.layout" :key="index" ref="draggable"
      :w="item.w" :h="item.h" :x="item.x" :y="item.y" :minh="item.minh" :minw="item.minw" :grid="grid"
      :isConflictCheck='isConflictCheck' :parent="true" :snap="snap" :active="true"
      :draggable="!isProd" :resizable="!isProd"
      v-on:dragstop="onDrag(index, arguments)" v-on:resizestop="onResize(index, arguments)">
      <smart-item :config="items.config[index]" :mode="mode" :index="index"></smart-item>
    </vue-draggable-resizable>
  </div>
  <div class="add-grid" :class="items.config.length?'':'center'" v-if="!isProd">
    <el-button @click="addGrid" round><i class="el-icon-circle-plus"></i> 添加格子</el-button>
  </div>
</section>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/src/components/vue-draggable-resizable.css'
import SmartItem from '@/components/SmartItem';
import viewMixin from '@/mixins/view';
import config from './Fixed';

const getMaxId = (layout) => {
  let max = 0;
  layout.forEach((grid) => {
    const i = grid.i - 0;
    if (i > max) max = i;
  });
  return max + 1;
};

export default {
  config,
  mixins: [viewMixin],
  components: {
    VueDraggableResizable,
    SmartItem,
  },
  data() {
    return {
      isConflictCheck: true,
      snap: true,
    };
  },
  computed: {
    grid() {
      return (!this.Prod && this.config.showGrid) ? [this.config.gridW, this.config.gridH] : [1, 1];
    },
    style() {
      const style = {};
      if (this.config.fixedHeight) {
        style.height = this.config.fixedHeight + 'px';
      }
      if (this.config.fixedWidth) {
        style.width = this.config.fixedWidth + 'px';
      }
      if (this.mode !== 'production' && this.config.showGrid) {
        const { gridW, gridH } = this.config;
        style.background = 'linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0%, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0%';
        style.backgroundSize = `${gridW}px ${gridH}px, ${gridW}px ${gridH}px`;
      }
      return style;
    },
    backgroundColor() {
      const style = {};
      if (this.config.fixedHeight) {
        style.height = this.config.fixedHeight + 'px';
      }
      if (this.config.fixedWidth) {
        style.width = this.config.fixedWidth + 'px';
      }
      if (this.config.bgColor) {
        style.background = this.config.bgColor;
      }
      return style;
    },
  },
  methods: {
    addGrid() {
      let x = 0;
      let y = 0;
      const w = 200;
      const h = 200;
      const offsetX = Math.floor(Math.random() * 100);
      const offsetY = Math.floor(Math.random() * 100);
      const containerWrp = this.$refs.container.parentElement.parentElement;
      const container = containerWrp.parentElement;
      const offsetTop = containerWrp.scrollTop;
      const offsetLeft = containerWrp.scrollLeft;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      x = Math.floor((width > this.config.fixedWidth ? this.config.fixedWidth : width) / 2 + offsetLeft)
      y = Math.floor((height > this.config.fixedHeight ? this.config.fixedHeight : height) / 2 + offsetTop)
      x -= (w - offsetX) / 2 + offsetX;
      y -= (h - offsetY) / 2 + offsetY;
      const { layout, config } = this.items;
      layout.push({
          x, y,
          w, h,
          i: getMaxId(layout),
      });
      config.push({});
      this.$nextTick(() => {
        this.$refs.draggable[config.length - 1].enabled = true;
      })
    },
    onResize(index, [x, y, w, h]) {
      this.items.layout[index] = {
        x,y,w,h,
      };
    },
    onDrag(index, [x, y]) {
      this.items.layout[index].x = x;
      this.items.layout[index].y = y;
    },
  },
};
</script>
<style lang="scss" scoped>
  .add-grid{
    text-align: center;
    position: fixed;
    bottom: 10px;
    right: 68px;
    transform: translateX(0);
    transition: all 0.4s;
    &.center {
      right: 50%;
      transform: translateX(100%);
      bottom: 50%;
    }
  }
  .container{
    /deep/ {
      .vdr{
        border: none;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
      }
      .handle{
        background-color: transparent;
      }
    }
  }
  .container-wrp.production{
    /deep/ {
      .vdr{
        box-shadow: none;
      }
    }
  }
</style>
