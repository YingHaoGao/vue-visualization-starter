<template>
<div class="handler">
  <a href="javascript:;" @click="emit('onSelectItem')">
  <el-tooltip effect="dark" :content="config.componentKey?'更换组件':'添加组件'" placement="top">
    <!-- <img src="../assets/svg/item.svg" width="18" alt=""> -->
    <i class="el-icon-s-marketing"></i>
  </el-tooltip></a>
  <a href="javascript:;" @click="emit('onEditItem')" v-if="config.componentKey">
  <el-tooltip effect="dark" content="配置组件" placement="top"><i class="el-icon-edit-outline"></i></el-tooltip></a>
  <a href="javascript:;" @click="emit('onRemoveItem')" v-if="config.componentKey">
  <el-tooltip effect="dark" content="删除组件" placement="top"><i class="el-icon-delete"></i></el-tooltip></a>
  <a href="javascript:;" @click="emit('onRemoveItem', true)" v-if="config.componentKey">
  <el-tooltip effect="dark" content="删除格子" placement="top"><i class="el-icon-circle-close"></i></el-tooltip></a>
</div>
</template>

<script>
export default {
  inject: ['viewEditor'],
  props: {
    config: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    emit(action, e) {
      this.viewEditor[action](this.$props, e);
    },
  },
};
</script>
<style lang="scss" scoped>
.handler{
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  opacity: 0;
  transition: all 0.3s;
  text-align:right;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    opacity: 1;
  }
  a{
    color: #304156;
    margin: 0 5px;
    font-size: 20px;
    &:first-of-type{
      margin-left: 0;
    }
    &:last-of-type{
      margin-right: 0;
    }
  }
}
</style>
