<template>
<section class="grid-container" :class="{static:isProd}" :style="style">
  <grid-layout
    :layout.sync="items.layout"
    :col-num="config.colNum"
    :row-height="config.rowHeight"
    :is-draggable="!isProd" :is-resizable="!isProd"
    :responsive="true"
    :vertical-compact="config.verticalCompact"
    :margin="[10, 10]"
    :auto-size="config.autoSize"
    :use-css-transforms="false"
  >
    <grid-item v-for="(item, index) in items.layout"
      :key="index"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      >
      <smart-item :config="items.config[index]" :mode="mode" :index="index"></smart-item>
    </grid-item>
  </grid-layout>
  <div class="add-grid" :class="items.config.length?'':'center'" v-if="!isProd">
    <el-button @click="addGrid" round><i class="el-icon-circle-plus"></i> 添加格子</el-button>
  </div>
</section>
</template>
<script>
import VueGridLayout from 'vue-grid-layout-item';
import SmartItem from '@/components/SmartItem';
import viewMixin from '@/mixins/view';
import config from './Grid';

export default {
  config,
  mixins: [viewMixin],
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    SmartItem,
  },
  data() {
    return {
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
      if (this.config.bgColor) {
        style.background = this.config.bgColor;
      }
      return style;
    },
    added() {
      let max = 0;
      this.items.layout.forEach((grid) => {
        const i = grid.i - 0;
        if (i > max) max = i;
      });
      return max + 1;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    addGrid() {
      this.items.layout.push({
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        i: this.added,
      });
      this.items.config.push({});
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container{
  padding-bottom: 50px;
  /deep/{
    .vue-grid-item{
      &:not(.vue-grid-placeholder) {
        background: #fff;
        box-shadow: 0 0 1px rgba(0,0,0,0.05);
        border-radius: 2px;
      }
      &.vue-draggable-dragging{
        box-shadow: 0 0 5px rgba(0,0,0,0.05);
      }
      .vue-resizable-handle{
        opacity: 0;
        transition: opacity 0.2s;
      }
      &:hover{
        .vue-resizable-handle{
          opacity: 1;
        }
      }
      &.static{
        transition: none;
        transition-property: left,top,right;
        background: transparent;
      }
    }
  }
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
}

</style>
