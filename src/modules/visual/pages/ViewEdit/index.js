import { getViewConf } from '@/views';
import SmartItem from '@/components/SmartItem';
import SmartView from '@/components/SmartView';
import MouldList from './MouldList.vue';
import ItemList from './ItemList.vue';
import ItemToolbar from '../ItemList/Toolbar.vue';
import Sidebar from './Sidebar.vue';
import Toolbar from './Toolbar.vue';

let tmpviewKey = '';
const storageKey = 'tmpview';
export default {
  provide() {
    return {
      // 提供视图编辑器控制
      viewEditor: this,
    };
  },
  components: {
    MouldList,
    ItemList,
    ItemToolbar,
    Sidebar,
    Toolbar,
    SmartItem,
    SmartView,
  },
  data() {
    return {
      loading: true,
      visibleSidebar: false,
      isManager: false,
      isSaving: false,
      id: 0,
      /**
       * 视图配置信息
       */
      config: {
        templateKey: '',
        title: '',
        description: '',
      },
      /**
       * 组件集包括两部分内容
       * config 组件配置信息,组件实例化时会注入
       * layout 组件布局信息,应用于视图模板
       */
      // items: {
      //   config: [],
      //   layout: [],
      // },
      activeItem: null,
      lastData: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    // view | myview
    this.viewType = this.$route.query.type;
    tmpviewKey = `${storageKey}/${this.viewType}`;
    this.getView(this.id);
  },
  mounted() {
    window.onbeforeunload = () => {
      this.saveLocalStorage();
    };
  },
  methods: {
    setViewItems(items) {
      this.$nextTick(() => {
        if (this.$refs.view && this.$refs.view.setItems) this.$refs.view.setItems(items);
      });
    },
    getView(id) {
      if (id) {
        this.fetchViewFromRemote(id);
      } else {
        this.fetchViewFromStorage();
      }
    },
    fetchViewFromRemote(id) {
      this.$http.get(`/${this.viewType}/${id}`).then(({ data }) => {
        if (data.status === 'OK' && data.data) {
          try {
            const templateMeta = JSON.parse(data.data.templateMeta);
            const components = JSON.parse(data.data.components);
            delete data.data.templateMeta;
            delete data.data.components;
            if (!components || !templateMeta) throw new Error('模板解析错误!');
            const defaultConfig = getViewConf(data.data.templateKey);
            const conf = Object.assign({}, defaultConfig, data.data, templateMeta);
            this.config = Object.assign(conf, {
              tierId: conf.tierId - 0 || 0,
              isDefault: conf.isDefault - 0 ? 1 : 0,
              isEnabled: conf.isEnabled - 0 ? 1 : 0,
            });
            console.log(this.config);
            this.setViewItems(components);
            setTimeout(() => {
              this.visibleSidebar = true;
            }, 300);
          } catch (e) {
            throw new Error(e);
          }
        } else {
          throw new Error('没有找到视图');
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '没有找到视图!',
        });
      }).finally(() => {
        this.loading = false;
      });
    },
    fetchViewFromStorage() {
      const tmpview = window.localStorage.getItem(tmpviewKey);
      try {
        if (tmpview) {
          const data = JSON.parse(tmpview);
          if (data && data.config && !data.config.id) {
            this.lastData = data;
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.$nextTick(() => {
          this.$refs.mouldList.open(false);
        });
        this.loading = false;
      }
    },
    useLastData() {
      this.config = this.lastData.config;
      this.setViewItems(this.lastData.items);
      this.lastData = null;
      setTimeout(() => {
        this.visibleSidebar = true;
      }, 300);
    },
    selectMould() {
      if (this.$refs.view && !this.$refs.view.items.config.length) {
        this.$refs.mouldList.open();
        return;
      }
      this.$confirm('重新选择模板将清空当前所有内容，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$refs.mouldList.open();
      });
    },
    selectedMould(mould) {
      this.config = Object.assign({}, mould, { title: '', cover: '' });
      setTimeout(() => {
        this.visibleSidebar = true;
      }, 300);
    },
    onSelectItem(item) {
      this.activeItem = item;
      this.$refs.itemList.open();
    },
    onEditItem(item) {
      this.activeItem = item;
      this.$refs.itemToolbar.open(item.config);
    },
    onRemoveItem({ index }, isGrid = false) {
      const { config } = this.$refs.view.$options;
      if (config && typeof config.immutableGridNumber !== 'undefined' && config.immutableGridNumber === false) {
        if (isGrid) {
          this.$refs.view.items.config.splice(index, 1);
          this.$refs.view.items.layout.splice(index, 1);
        } else {
          this.$refs.view.items.config[index] = {};
          this.$set(this.$refs.view.items.config, index, {});
        }
      } else {
        this.$refs.view.items.config[index] = {};
        this.$refs.view.items.layout[index] = {};
        this.$set(this.$refs.view.items.config, index, {});
      }
    },
    onChooseItem(item) {
      this.$set(this.$refs.view.items.config, this.activeItem.index, Object.assign({}, this.activeItem.config, item));
      this.$refs.itemList.close();
    },
    openToolbar() {
      if (!this.config.cover) this.config.cover = '';
      this.$refs.toolbar.open(this.config);
    },
    openSidebar() {
      this.visibleSidebar = true;
      setTimeout(() => {
        this.$refs.scrollbar.update();
      }, 400);
    },
    hideSidebar() {
      this.visibleSidebar = false;
    },
    onPreview() {
      this.saveLocalStorage();
      const {
        origin,
        pathname,
      } = window.location;
      this.win = window.open(`${origin}${pathname}#/visual/view/preview?type=${this.viewType}`);
    },
    clearAllItem() {
      const { config } = this.$refs.view.$options;
      if (config && typeof config.immutableGridNumber !== 'undefined' && config.immutableGridNumber === false) {
        this.$refs.view.items.layout = [];
        this.$refs.view.items.config = [];
      } else {
        const arr = this.$refs.view.items.config.map(() => ({}));
        this.$refs.view.items.config = arr;
        this.$refs.view.items.layout = arr;
      }
    },
    onSave() {
      if (!this.config.title) {
        this.$message({
          type: 'info',
          message: '请输入视图名称!',
        });
        this.openToolbar();
        this.$nextTick(() => {
          if (this.$refs.toolbar.$refs.title) this.$refs.toolbar.$refs.title.focus();
        });
        return;
      }
      if (!this.$refs.view.items.config.length) {
        this.$message({
          type: 'info',
          message: '视图没有内容!',
        });
        return;
      }
      const has = this.$refs.view.items.config.some(conf => !!conf.componentKey);
      if (!has) {
        this.$message({
          type: 'info',
          message: '视图没有内容!',
        });
        return;
      }
      this.isSaving = true;
      /**
       * 组件数据库字段
       */
      const config = {
        title: this.config.title,
        icon: this.config.icon,
        cover: this.config.cover,
        description: this.config.description,
        isDefault: this.config.isDefault ? 1 : 0,
        isEnabled: this.config.isEnabled ? 1 : 0,
        templateKey: this.config.templateKey,
        tierId: this.config.tierId || 0,
        viewType: this.config.viewType || this.$route.query.type,
      };
      const excludeKey = ['options', 'config', 'id'];
      /**
       * 组件视图选项
       * 如果与视图默认值相等，不添加
       */
      const options = {};
      const defaultViewConf = getViewConf(this.config.templateKey);
      Object.keys(this.config).forEach((k) => {
        if (typeof config[k] === 'undefined' && excludeKey.indexOf(k) < 0) {
          // if (this.config[k] !== defaultViewConf[k]) {
          //   options[k] = this.config[k];
          // }
          if (this.config[k] !== defaultViewConf[k]) {
            options[k] = this.config[k];
          }
        }
      });

      config.templateMeta = JSON.stringify(options);
      config.components = JSON.stringify(this.$refs.view.items);
      const requestMethod = this.config.id ? 'put' : 'post';
      if (this.config.id) config.id = this.config.id;

      this.$http[requestMethod](`/${this.viewType}`, config).then(({ data }) => {
        if (data.status === 'OK') {
          if (data.code !== '0') throw new Error(data.msg);
          if (!this.config.id) {
            this.config.id = data.data;
          }
          this.clearLocalStorage();
          this.$message.success('保存成功！');
        } else {
          throw new Error('保存失败！');
        }
      }).catch((e) => {
        console.error(e);
        this.$message.error(e.message);
      }).finally(() => {
        this.isSaving = false;
      });
    },
    saveLocalStorage() {
      // if (this.config && this.config.id) return;
      if (this.config && this.$refs.view && this.$refs.view) {
        localStorage.setItem(tmpviewKey, JSON.stringify({
          config: this.config,
          items: this.$refs.view.items,
        }));
      }
    },
    clearLocalStorage() {
      localStorage.setItem(tmpviewKey, '');
    },
  },
  beforeRouteLeave(to, from, next) {
    this.saveLocalStorage();
    next();
  },
};
