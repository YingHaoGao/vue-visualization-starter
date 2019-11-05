
<template>
<div>
  <transition name="opacity">
    <div class="mask" v-if="visible" @click="hide"></div>
  </transition>
  <transition name="sidebar">
    <div class="toolbar" v-if="visible">
      <a href="javascript:;" class="hideBtn" @click="hide"><i class="el-icon-arrow-right"></i></a>
      <el-scrollbar class="no-horizontal">
        <h4 class="group-header">基础设置</h4>
        <el-form style="padding:0 20px 0 0;" label-position="right" size="mini" :model="config" label-width="100px">
          <el-form-item label="标题">
            <el-input v-model.trim="config.title" ref="title"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <div style="display:flex;">
              <el-select style="flex:1" v-model="config.tierId" placeholder="请选择类别">
                <el-option v-for="catalog in catalogs" :key="catalog.id" :label="catalog.title" :value="catalog.id"></el-option>
              </el-select>
              <div style="width:28px;padding-left:10px;" href="javascript:;">
                <!-- <el-popover
                    placement="top"
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
                  <el-button type="primary" size="mini" circle slot="reference" @click="openAddCatalog"><i class="el-icon-notebook-2"></i></el-button>
                </el-popover> -->
                <catalog-dialog :type="$route.query.type"/>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="预览图">
            <cover-upload
              :imageUrl="config.cover"
              :on-success="handleCoverSuccess">
            </cover-upload>
          </el-form-item>
          <el-form-item label="视图描述">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model.trim="config.description" resize="none"></el-input>
          </el-form-item>
        </el-form>

        <div v-if="config.options">
          <h4 class="group-header">模板配置</h4>
          <el-form style="padding: 0 20px 10px 10px;" label-position="right" size="mini" :model="config" label-width="100px">
            <div v-for="(item,key) in config.options" :key="key" >
              <el-form-item v-if="item.type==='select'" :label="item.label">
                <el-select v-model="config[key]" placeholder="item.placeholder || ''" style="width:100%">
                  <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="item.type==='text'" :label="item.label">
                <el-input v-model.trim="config[key]" style="width:100%"></el-input>
              </el-form-item>
              <el-form-item v-if="item.type==='radio'" :label="item.label">
                <el-radio-group v-model="config[key]" size="mini">
                  <el-radio v-for="opt in item.options" :key="opt.value" :label="opt.value">{{opt.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="item.type==='checkbox'" :label="item.label">
                <el-checkbox-group v-model="config[key]" size="mini">
                  <el-checkbox v-for="opt in item.options" :key="opt.value" :label="opt.value">{{opt.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item v-if="item.type==='switch'" :label="item.label">
                <el-switch v-model="config[key]"></el-switch>
              </el-form-item>
              <el-form-item v-if="item.type==='color'" :label="item.label">
                <el-color-picker v-model="config[key]" size="mini"></el-color-picker>
              </el-form-item>
              <el-form-item v-if="item.type==='date'" :label="item.label">
                <el-date-picker
                  v-model="config[key]"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%">
                </el-date-picker>
              </el-form-item>
              <el-form-item v-if="item.type==='time'" :label="item.label">
                <el-time-picker
                  v-model="config[key]"
                  placeholder="选择时间"
                  style="width:100%">
                </el-time-picker>
              </el-form-item>
              <el-form-item v-if="item.type==='number'" :label="item.label">
                <div v-if="typeof config[key] ==='object'">
                  <el-row>
                    <el-col :span="24" v-for="(subitem, subItemIndex) in config[key]" :key="subItemIndex">
                      <el-input-number v-model="config[key][subItemIndex]" :min="item.min" :max="item.max" :label="item.label" style="width:100%"></el-input-number>
                    </el-col>
                  </el-row>
                </div>
                <div v-else>
                  <el-input-number v-model="config[key]" :min="item.min" :max="item.max" :label="item.label" style="width:100%"></el-input-number>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-scrollbar>
      <div>
      <div class="footer">
        <el-button type="primary" size="small" round style="width:100%" @click="done"
        :loading="isSaving">保存</el-button>
      </div>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
import CoverUpload from '@/components/CoverUpload.vue';
import CatalogDialog from '../CatalogDialog.vue';

export default {
  props: {
    isSaving: {
      type: Boolean,
      default: false,
    },
  },
  components: { CoverUpload, CatalogDialog },
  data() {
    return {
      visible: false,
      config: {},

    };
  },
  computed: {
    catalogs() {
      return [...this.$store.state.catalog[this.$route.query.type], {
        id: 0,
        title: '未分类',
      }];
    },
  },
  created() {
    this.$store.dispatch('catalog/fetch', this.$route.query.type);
  },
  methods: {
    open(config) {
      this.config = config;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    done() {
      this.$parent.onSave();
      // this.hide();
    },
    handleCoverSuccess(response) {
      this.config.cover = response.data;
    },
  },
};
</script>
<style lang="scss" scoped>
.toolbar{
  padding: 0 0 10px 10px;
  width: 280px;
  position: fixed;
  right: 0;
  top: 52px;
  bottom: 0;
  background: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -2px 0 2px rgba(0,0,0,.2);
  z-index: 2;
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
  *{
    font-weight: 300;
  }
  /deep/{
    .el-upload--picture-card{
      width: 100px;
      height: 80px;
      line-height: 84px;
    }
  }
}
.hideBtn{
  position: absolute;
  left: -30px;
  bottom: 10px;
  color: rgb(191, 203, 217);
  background: #304156;
  width: 30px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.mask{
  background: rgba($color: #000, $alpha: 0.1);
  position: fixed;
  right: 0;
  left: 0;
  top: 52px;
  bottom: 0;
}
.group-header{
  padding: 10px 5px;
  margin: 0;
  color: #333;
  font-weight: 400;
}
.footer{
  padding-right: 10px;
  /deep/ {
    .el-button {
      // border-radius: 0;
    }
  }
}
</style>

