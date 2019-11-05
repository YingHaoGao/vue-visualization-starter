<template>
<div class="views">
  <div class="header">
    <el-row :gutter="20" >
      <el-col :span="14">
        <el-button v-if="$permission(`post:/${type}`)" size="mini" type="primary"
          style="margin-right:10px;"
          @click="$router.push(`/visual/manage/view/add?type=${type}`)">
          <i class="el-icon-news"></i> <span>新建视图</span>
          </el-button>
        <el-select v-model="catalogId" size="mini" placeholder="请选择分类">
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
          <el-option
            label="未分类"
            value="0">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
          <el-input size="mini" placeholder="搜索" v-model.trim="keyword" >
            <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
          </el-input>
      </el-col>
    </el-row>
  </div>
  <div class="list" v-loading="loading">
    <el-scrollbar class="no-horizontal" style="height:100%">
      <div class="list-wrp">
        <el-row :gutter="30" v-if="viewList.length">
          <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24"
            v-for="(item, index) in viewList" :key="`${item.templateKey}-${item.id}-${index}`">
            <div class="card" @click.stop="openPreview(item)">
              <div class="card-cover" :style="{backgroundImage:`url(${item.cover? API_BASE_URL+item.cover : '/examples/1.jpg'})`}">
                <div v-if="$permission(`put:/${type}`)" style="position:absolute;right: 12px;" @click.stop="onEnabled(item)">
                  <el-tooltip effect="dark" content="开启" placement="top">
                    <el-switch v-model="item.isEnabled=='1'"></el-switch>
                  </el-tooltip>
                </div>
              </div>
              <div class="card-body">
                <h4>{{item.title}}</h4>
                <p>{{item.description}}</p>
                <p><i class="el-icon-folder"></i> {{catalogTitle(item.tierId)}}</p>
                <div class="card-handler">
                  <el-tooltip v-if="$permission(`put:/${type}`)" effect="dark" :content="'设为默认'" placement="top">
                  <a href="javascript:;" @click.stop="onDefault(item, index)" v-if="item.id&&type==='myview'"
                    :class="[item.isDefault == '1' ? 'active' : 'disabled']"><i class="el-icon-s-home"></i></a>
                  </el-tooltip>
                  <a href="javascript:;" v-if="item.id && $permission(`put:/${type}`)" @click.stop="onEditView(item)"><i class="el-icon-edit-outline"></i></a>
                  <a href="javascript:;" v-if="item.id && $permission(`delete:/${type}`)" @click.stop="onDeleteView(item, index)"><i class="el-icon-delete"></i></a>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
    <div v-if="!loading&&!viewList.length" class="lx-no-data">
      没有数据
    </div>
  </div>
</div>
</template>

<script>
import { API_BASE_URL } from '@/config';

const checkKeyword = (keyword, item) => {
  if (!keyword || !item) return true;
  const work = keyword.toLowerCase();
  const {
    title = '',
    description = '',
  } = item;
  if (title && title.toLowerCase().indexOf(work) >= 0) return true;
  else if ((description && description.toLowerCase().indexOf(work) >= 0)) return true;
  return false;
};

export default {
  inject: ['shell'],
  data() {
    return {
      views: [],
      keyword: '',
      catalogId: '',
      loading: true,
      type: '',
      API_BASE_URL,
    };
  },
  computed: {
    viewList() {
      return this.views.filter((view) => {
        if (this.keyword && !checkKeyword(this.keyword, view)) return false;
        if (this.catalogId !== '' && view.tierId != this.catalogId) return false;
        return true;
      })
    },
    catalogs() {
      return this.$store.state.catalog[this.type];
    },
  },
  created() {
    this.type = this.$route.path.indexOf('myview') >= 0 ? 'myview' : 'view';
    this.$store.dispatch('catalog/fetch', this.type);
    this.fetch();
  },
  mounted() {
  },
  methods: {
    fetch() {
      this.$http.get(`/${this.type}`).then(({ data }) => {
        if (data.status === 'OK') {
          this.views = data.data;
        }
      }).catch(() => {
      }).finally(() => {
        this.loading = false;
      });
    },
    openPreview(item) {
      this.$router.push(`/visual/${this.type}/${item.id || item.config.id}`);
    },
    onDeleteView(item, index) {
      this.$confirm('确定删除该视图?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.views.splice(index, 1);
        return this.$http.delete(`/${this.type}`, { data: [item.id || item.config.id]}).then(({ data }) => {
          if (data.status === 'OK') {
            this.$message.success('删除成功');
          }
        }).catch(() => {
          this.$message.error('删除失败');
        });
      });
    },
    onEditView(item) {
      this.$router.push(`/visual/manage/view/${item.id || item.config.id}?type=${this.type}`);
    },
    onDefault(item, index) {
      if (item.isDefault == '1') return;
      this.views.forEach((view) => {
        if (view.isDefault == '1') this.putViewData({id: view.id, isDefault: 0 });
        view.isDefault = false;
      });
      item.isDefault = true;
      this.putViewData({ id: item.id, isDefault: 1 }).then(({ data }) => {
        if (data.status !== 'OK') throw new Error('操作失败！');
        if (this.notifyInstance) this.notifyInstance.close();
        this.notifyInstance = this.$notify({
          title: '成功',
          message: '已设为默认',
          type: 'success'
        });
      }).catch((e) => {
        this.$message.error(e.message || e);
        item.isDefault = false;
      });
    },
    putViewData(data) {
      return this.$http.put(`/${this.type}`, data);
    },
    onEnabled(item) {
      item.isEnabled = item.isEnabled == '1' ? 0 : 1;
      this.putViewData({ id: item.id, isEnabled: item.isEnabled }).then(({ data }) => {
        if (data.status === 'OK') {
          if (this.notifyInstance) this.notifyInstance.close();
          this.notifyInstance = this.$notify({
            title: '成功',
            message: item.isEnabled ? '已启用' : '已禁用',
            type: 'success'
          });
          this.$root.loadMenu();
        } else {
          throw new Error('操作失败！');
        }
      }).catch((e) => {
        this.$message.error(e.message || e);
      });
    },
    catalogTitle(id) {
      let title = '未分类';
      this.catalogs.some(item => {
        if (item.id == id) {
          title = item.title;
          return true;
        }
        return false;
      })
      return title;
    },
  },
  beforeDestroy() {
  },
};
</script>
<style lang="scss" scoped>
.views{
  background: #FFF;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header{
  padding: 15px 15px 15px;
  background: #FFF;
  border-bottom: 1px solid rgb(224, 224, 224);
}
.list{
  min-height:105px;
  flex: 1;
}
.list-wrp{
  padding: 20px 20px 10px;
}
.card{
  background: rgba(235, 238, 245, 0.64);
  border-radius: 3px;
  margin-bottom: 25px;
  padding: 10px;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
  &:hover{
    box-shadow: 0 0 4px rgba($color: #000, $alpha: 0.4);
    .card-handler{
      opacity: 1;
    }
  }
  .card-handler{
    transition: opacity 0.1s;
    position: absolute;
    bottom: 10px;
    right: 10px;
    a{
      margin: 0 4px;
      color: #4d6586;
      font-size: 22px;
      text-shadow: 1px 1px 1px rgba(128, 126, 126, 0.5);
      .el-icon-delete{
        color: #ff7373;
      }
      &.disabled{
        color: #bccde4;
      }
    }
  }
}
.card-cover{
  width: 100%;
  background: rgb(211, 220, 229) center no-repeat;
  background-size: cover;
  margin-right: 10px;
  border-radius: 3px;
  height: 200px;
  /deep/ {
    .el-switch__core{
      box-shadow: 0 0 2px #304156;
    }
  }
}
.card-body{
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding:  5px 0;
  color: #555;
  height: 50px;
  h4{
    margin: 0;
  }
  p{
    margin: 0;
    font-size: 12px;
  }
}
.card-handler{

}
</style>
