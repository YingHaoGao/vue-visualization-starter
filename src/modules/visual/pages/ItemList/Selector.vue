
<template>
  <el-row :gutter="20" type="flex" justify="space-between" style="flex-wrap: wrap;">
    <el-col class="filter-item" style="width: 294px;">
      <span class="filter-itemname">分类</span>
      <el-select v-model="filter.catalogId" size="mini" placeholder="请选择分类">
        <el-option-group>
          <el-option
            key="all"
            label="全部"
            value="">
          </el-option>
          <el-option
            v-for="item in catalogs"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-option-group>
        <el-option-group>
          <el-option
            v-for="item in status"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-option-group>
      </el-select>
      <div style="display:inline-block;margin-left: 10px;" v-if="isManager">
        <catalog-dialog type="component"/>
      </div>
    </el-col>
    <el-col class="filter-item" style="width: 225px;" v-if="isManager">
        <span class="filter-itemname">只显示</span>
        <el-checkbox-group style="float:left" size="mini" v-model="filter.isEnabled" @change="onChangeEnabled">
          <el-checkbox-button :label="1">已启用的</el-checkbox-button>
          <el-checkbox-button :label="0">未启用的</el-checkbox-button>
        </el-checkbox-group>
    </el-col>
    <el-col class="filter-item" style="width: 380px;">
      <el-input size="mini" placeholder="搜索组件" v-model="filter.keyword" style="width: 260px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group style="margin-left: 10px;">
        <el-tooltip content="列表显示" placement="bottom" :open-delay="400">
          <el-button @click="onListMode('list')" :type="listMode==='list'?'primary':''" size="mini" icon="el-icon-s-unfold"></el-button>
        </el-tooltip>
        <el-tooltip content="缩略图显示" placement="bottom" :open-delay="400">
          <el-button @click="onListMode('grid')" :type="listMode==='list'?'':'primary'" size="mini" icon="el-icon-s-grid"></el-button>
        </el-tooltip>
      </el-button-group>
    </el-col>
  </el-row>
</template>

<script>
import CatalogDialog from '../CatalogDialog.vue';

export default {
  props: ['isManager'],
  inject: ['filter'],
  components: { CatalogDialog },
  data() {
    return {
      newCatalogName: '',
      catalogAdding: false,
    }
  },
  computed: {
    status() {
      const status = [{
        id: 0,
        title: '未分类',
      }];
      if (this.isManager) {
        status.push({
          id: 'none',
          title: '未添加',
        });
      }
      return status;
    },
    listMode() {
      return this.$store.state.item.listMode;
    },
    catalogs() {
      return this.$store.state.catalog.component;
    },
  },
  methods: {
    onListMode(e) {
      this.$store.commit('item/setListMode', e);
    },
    onChangeEnabled(e) {
      if (this.filter.isEnabled.length > 1) this.filter.isEnabled = [e[1]];
    },
    openAddCatalog() {
      this.$nextTick(() => () => this.$refs.newCatalog.focus());
    },
    onAddCatalog() {
      this.catalogAdding = true;
      this.$store.dispatch('catalog/add', { typeName: 'component', title: this.newCatalogName }).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功!',
        });
        this.$store.dispatch('catalog/fetch', 'component');
        this.$refs.popover.doClose();
        this.newCatalogName = '';
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '添加失败!',
        });
      }).finally(() => {
        this.catalogAdding = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.preview{
  height: 400px;
}
.filter-item{
  margin-bottom: 10px;
}
.filter-itemname{
  font-size: 12px;
  line-height: 28px;
  margin-right: 10px;
  float: left;
}
.preview-dialog{
  /deep/ {
    .el-dialog__body{
      padding: 0;
    }
  }
}
</style>
