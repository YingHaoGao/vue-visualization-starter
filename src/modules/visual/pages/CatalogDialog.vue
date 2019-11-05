<template>
<div>
  <el-button type="primary" size="mini" circle @click="open"><i class="el-icon-notebook-2"></i></el-button>
  <el-dialog :visible.sync="visible" :append-to-body="true">
    <div slot="title">
      <el-popover
        placement="bottom-start"
        ref="popover"
        width="200">
        <el-input
          placeholder="请输入分类名称"
          v-model.trim="newCatalogName"
          @keyup.enter.native="onAddCatalog"
          size="small"
          ref="newCatalog"
          clearable/>
        <div style="margin-top: 10px;text-align: right;">
        <el-button type="primary" :loading="catalogAdding" size="mini" @click="onAddCatalog">确定</el-button>
      </div>
      <el-button type="primary" size="mini" slot="reference" @click="openAddCatalog">
        <i class="el-icon-plus"></i> 添加分类
      </el-button>
    </el-popover>
    </div>
    <el-table
      :data="catalogs"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="名称">
        <template slot-scope="scope">
          <el-input v-if="editRow.index===scope.$index" v-model="editTitle" placeholder="请输入内容"
            ref="input"
            @keyup.enter.native.stop="saveEdit"
            @blur="onBlur"
            ></el-input>
          <span v-else>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'view',
    },
  },
  data() {
    return {
      visible: false,
      newCatalogName: '',
      catalogAdding: false,
      editRow: {
        index: -1,
        data: {},
      },
      editTitle: '',
    };
  },
  computed: {
    catalogs() {
      return this.$store.state.catalog[this.type];
    },
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
    openAddCatalog() {
      this.$refs.newCatalog.focus();
    },
    async saveEdit() {
      if (this.editRow.data.title === this.editTitle) {
        this.editRow = {
          index: -1,
          data: {},
        };
        return;
      }
      try {
        await this.$store.dispatch('catalog/update', {
          id: this.editRow.data.id,
          title: this.editTitle,
        });
        this.$store.dispatch('catalog/fetch', this.type);
        this.editRow = {
          index: -1,
          data: {},
        };
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: '修改失败~',
        });
      }
    },
    handleEdit(index, row) {
      this.editRow = {
        index,
        data: row,
      };
      this.editTitle = row.title;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onBlur() {
      this.editRow = {
        index: -1,
        data: {},
      };
    },
    async handleDelete(index, row) {
      const title = `确定删除？删除后，相关联的${this.type === 'view' ? '视图' : '组件'}将归为未分类`;
      await this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });
      try {
        await this.$store.dispatch('catalog/delete', row);
        this.$store.dispatch('catalog/fetch', this.type);
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: '删除失败~',
        });
      }
    },
    onAddCatalog() {
      this.catalogAdding = true;
      this.$store.dispatch('catalog/add', { typeName: this.type, title: this.newCatalogName }).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功!',
        });
        this.$refs.popover.doClose();
        this.$store.dispatch('catalog/fetch', this.type);
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

</style>
