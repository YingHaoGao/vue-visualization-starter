
<template>
<div class="toolbar-wrp">
  <transition name="opacity">
    <div class="mask" v-if="visible" @click="hide"></div>
  </transition>
  <transition name="sidebar">
    <div class="toolbar" v-if="visible">
      <a href="javascript:;" class="hideBtn" @click="hide"><i class="el-icon-arrow-right"></i></a>
      <el-scrollbar class="no-horizontal" style="flex:1">
        <div class="group-header">基础设置</div>
        <el-form style="padding:0 20px 0 0;" label-position="right" size="mini" :model="config" label-width="100px">
          <el-form-item v-if="isManager">
            <div slot="label">
              <el-tooltip effect="dark" content="开启后可在编辑视图时可用" placement="left"><i class="el-icon-warning"></i></el-tooltip>
              启用状态
            </div>
            <el-switch v-model="config.isEnabled"></el-switch>
          </el-form-item>
          <el-form-item label="显示标题">
            <el-input ref="title" v-model.trim="config.title"></el-input>
          </el-form-item>
          <el-form-item label="类别" v-if="isManager">
            <el-select v-model="config.tierId" placeholder="请选择类别">
              <el-option v-for="catalog in catalogs" :key="catalog.id" :label="catalog.title" :value="catalog.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面" v-if="isManager">
            <cover-upload
              :imageUrl="config.cover"
              :onSuccess="handleCoverSuccess">
            </cover-upload>
          </el-form-item>
          <!-- <el-form-item label="数据地址">
            <el-input v-model.trim="config.dataUrl"></el-input>
          </el-form-item>
          <el-form-item label="色调">
            <el-color-picker v-model="config.color" size="mini"></el-color-picker>
          </el-form-item> -->
          <el-form-item label="组件壳" v-if="!isManager">
            <el-select v-model="config.skin" placeholder="请选择组件壳" clearable>
              <el-option v-for="(skin,key) in itemSkins" :key="key" :label="skin.title" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示打印按钮">
            <el-switch v-model="config.isPrint"></el-switch>
          </el-form-item>
          <el-form-item label="显示重载按钮">
            <el-switch v-model="config.isReload"></el-switch>
          </el-form-item>
          <el-form-item label="组件描述" v-if="isManager">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model.trim="config.description" resize="none"></el-input>
          </el-form-item>
        </el-form>
        <div v-if="hasOption">
          <div class="group-header">组件属性</div>
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
                <el-input-number v-model="config[key]" :min="item.min" :max="item.max" :label="item.label" style="width:100%"></el-input-number>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-scrollbar>
      <div>
        <div class="footer">
          <el-row type="flex" justify="space-between">
            <el-col :span="3" v-if="isManager">
              <el-button @click="onRemove" :disabled="!config.id" type="danger" size="small" icon="el-icon-delete" circle></el-button>
            </el-col>
            <el-col :span="7" v-show="config.componentKey" v-if="isManager">
              <el-button @click="$parent.openPreview(config)" type="primary" size="small" plain round style="width:100%" icon="fa fa-eye"> 预览</el-button>
            </el-col>
            <el-col :span="13" v-if="isManager">
              <el-button type="primary" size="small" round style="width:100%" icon="fa fa-save" @click="save" :loading="loading"> 保存</el-button>
            </el-col>
            <el-col :span="24" v-if="!isManager">
              <el-button type="primary" size="small" round style="width:100%" @click="hide"> 完成</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
import itemSkins from '@/itemSkins';
import CoverUpload from '@/components/CoverUpload.vue'
import { getItemConf } from '@/items';

const defaultConf = {
  title: '',
  isEnabled: true,
  tierId: '',
  description: '',
  cover: '',
  isPrint: true,
  isReload: true,
};
const baseConfig = {
  label: '基础设置',
  list: {
    isEnabled: {
      label: '启用状态',
      type: 'switch',
      default: true,
      tips: '开启后可在编辑视图时可用',
    },
    title: {
      label: '显示标题',
      type: 'text',
    },
    cover: {
      label: '封面',
      type: 'dropdown',
      options: [{
        label: '拆线图',
        icon: 'fa fa-line-chart',
        value: 'line',
      }, {
        label: '柱图',
        icon: 'fa fa-line-chart',
        value: 'bar',
      }],
    },
    dataUrl: {
      label: '数据地址',
      type: 'text',
    },
    isPrint: {
      label: '显示打印',
      type: 'switch',
    },
    color: {
      label: '色调',
      type: 'color',
    },
    //  :key="catalog.id" :label="catalog.title" :value="catalog.id"
    tierId: {
      label: '类别',
      type: 'select',
      varName: true,
      placeholder: '请选择类别',
    },
    description: {
      label: '组件描述',
      type: 'textarea',
    },
  },
};

export default {
  props: ['isManager'],
  components: { CoverUpload },
  data() {
    return {
      loading: false,
      visible: false,
      config: Object.assign({}, defaultConf),
      itemSkins,
    };
  },
  computed: {
    catalogs() {
      return [...this.$store.state.catalog.component, {
        id: 0,
        title: '未分类',
      }];
    },
    hasOption() {
      if (!this.config.options) return false;
      return !!Object.keys(this.config.options).length;
    },
  },
  mounted() {
  },
  methods: {
    open(item) {
      Object.keys(defaultConf).forEach((k) => {
        if (typeof item[k] === 'undefined') this.$set(item, k, item[k]);
      });
      this.$set(this, 'config', item);
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    onRemove() {
      this.$parent.onDeleteItem(this.config);
    },
    save() {
      if (!this.config.title) {
        this.$message({
          type: 'info',
          message: '请输入组件名称!',
        });
        this.$nextTick(() => {
          if (this.$refs.title) this.$refs.title.focus();
        });
        return;
      }

      /**
       * 组件数据库字段
       */
      const config = {
        title: this.config.title,
        componentKey: this.config.componentKey,
        tierId: this.config.tierId || 0,
        isEnabled: this.config.isEnabled ? 1 : 0,
        description: this.config.description,
        cover: this.config.cover,
      };
      const excludeKey = ['options', 'config', 'id'];
      // dataUrl: '',
      // isPrint: true,
      // isReload: true,
      /**
       * 组件配置选项
       * 如果与组件默认值相等，不添加
       */
      const options = {};
      const defaultItemConf = getItemConf(config.componentKey);
      Object.keys(this.config).forEach((k) => {
        if (typeof config[k] === 'undefined' && excludeKey.indexOf(k) < 0) {
          if (
            (typeof defaultItemConf[k] === 'undefined' && typeof defaultConf[k] !== 'undefined') ||
            (this.config[k] !== defaultItemConf[k])
          ) {
            options[k] = this.config[k];
          }
        }
      });

      config.config = JSON.stringify(options);
      this.loading = true;
      if (this.config.id) {
        config.id = this.config.id;
        this.$http.put('/component', config).then(({ data }) => {
          if (data.status === 'OK') {
            if (data.code !== '0') throw new Error(data.msg);
            if (!this.config.id) {
              this.config.id = data.data;
            }
            this.$message.success('保存成功！');
            this.visible = false;
          } else {
            throw new Error('保存失败！');
          }
        }).catch((e) => {
          console.error(e);
          this.$message.error(e.message || e);
        }).finally(() => {
          this.loading = false;
        });
      } else {
        this.$http.post('/component', config).then(({ data }) => {
          if (data.status === 'OK') {
            if (data.code !== '0') throw new Error(data.msg);
            this.config.id = data.data;
            this.$message.success('保存成功！');
            this.$store.dispatch('item/fetchItems');
            this.visible = false;
          } else {
            throw new Error('保存失败！');
          }
        }).catch((e) => {
          this.$message.error(e.message || e);
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    done() {},
    handleCoverSuccess(response) {
      this.config.cover = response.data;
    },
  },
};
</script>
<style lang="scss" scoped>
.toolbar-wrp{
  position: fixed;
}
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
  left: -31px;
  bottom: 10px;
  color: #555;
  background: #fff;
  width: 30px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-right: 1px solid #eee;
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
  padding-top: 10px;
}
</style>

