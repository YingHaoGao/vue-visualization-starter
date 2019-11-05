
<template>
<transition name="sidebar">
<div class="sidebar" v-show="visible">
  <div>
    <el-tooltip effect="dark" :open-delay="tipDelay" content="重新选择模板" placement="left">
      <div class="item"><el-button type="text" icon="el-icon-s-grid" @click="selectMould"></el-button></div>
    </el-tooltip>
    <hr class="divider">
    <el-tooltip effect="dark" :open-delay="tipDelay" content="模板设置" placement="left">
      <div class="item"><el-button type="text" icon="el-icon-s-operation" @click="$parent.openToolbar"></el-button></div>
    </el-tooltip>
    <!-- <el-tooltip effect="dark" :open-delay="tipDelay" content="添加组件" placement="left">
      <div class="item"><el-button type="text" icon="el-icon-plus"></el-button></div>
    </el-tooltip> -->
    <el-tooltip effect="dark" :open-delay="tipDelay" content="清空所有内容" placement="left">
      <div class="item"><el-button type="text" icon="el-icon-delete" @click="clearAllItem"></el-button></div>
    </el-tooltip>
    <!-- <hr class="divider"> -->
    <el-tooltip effect="dark" :open-delay="tipDelay" :content="isFullscreen?'退出全屏':'全屏'" placement="left">
      <div class="item"><el-button type="text" icon="el-icon-full-screen" @click="onFullscreen"></el-button></div>
    </el-tooltip>
    <!-- <hr class="divider"> -->
  </div>
  <div>
    <el-tooltip effect="dark" :open-delay="tipDelay" content="预览" placement="left">
      <div class="item"><el-button type="text" icon="el-icon-view" @click="$parent.onPreview"></el-button></div>
    </el-tooltip>
    <el-tooltip effect="dark" :open-delay="tipDelay" content="保存" placement="left">
      <div class="item"><el-button type="text" :loading="isSaving" @click="$parent.onSave()" icon="el-icon-upload"></el-button></div>
    </el-tooltip>
    <div class="item">
      <el-button type="text" icon="el-icon-d-arrow-right" @click="$parent.hideSidebar();"></el-button>
    </div>
  </div>
</div>
</transition>
</template>
<script>
import screenfull from 'screenfull';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isSaving: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tipDelay: 400,
      isFullscreen: false,
    };
  },
  mounted() {
    screenfull.on('change', () => {
      this.isFullscreen = screenfull.isFullscreen;
      if (this.isFullscreen) this.$parent.hideSidebar();
    });
  },
  methods: {
    selectMould() {
      this.$parent.selectMould();
    },
    clearAllItem() {
      if (this.$parent.$refs.view && !this.$parent.$refs.view.items.config.length) return;
      this.$confirm('确定要清除所有组件', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$parent.clearAllItem();
      });
    },
    onFullscreen() {
      if (screenfull.enabled) {
        screenfull.toggle();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar{
  background: #304156;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item{
    color: inherit;
    display: flex;
    font-size: 18px;
    font-weight: 400;
    height: 70px;
    text-decoration: none;
    transition: background .3s cubic-bezier(.25,.8,.5,1);
    cursor: pointer;
    // align-items: center;
    // text-align: center;
    // justify-content: center;
    &:hover{
      background: hsla(0,0%,100%,.08);
    }
    .el-button--text{
      color: #FFF;
      font-size: 18px;
      width: 100%;
      border-radius: 0;
    }
  }
  .divider{
    display: block;
    flex: 1 1 0px;
    max-width: 100%;
    height: 0;
    max-height: 0;
    border: solid;
    border-width: thin 0 0 0;
    transition: inherit;
    border-color: hsla(0,0%,100%,.12);
    margin: 0 10px;
  }
}
@media screen and (max-height:544px) {
  .sidebar{
    .item{
      height: 50px;
    }
  }
}
</style>
