
<template>
<el-dialog title="选择组件" :visible.sync="visible" class="items-dialog" top="50px">
  <el-scrollbar ref="scrollbar" class="no-horizontal" style="height:100%" @close="onClose">
    <item-list ref="itemList" :isManager="false"/>
  </el-scrollbar>
</el-dialog>
</template>
<script>
import ItemList from '../ItemList/Index.vue';

export default {
  components: { ItemList },
  data() {
    return {
      visible: false,
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    onClose() {
      debugger;
    },
  },
};
</script>
<style lang="scss" scoped>
.items-dialog{
  display: flex;
  /deep/{
    .el-dialog{
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 50px 50px 5px 46px;
    }
    .el-dialog__body{
      padding: 0;
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
