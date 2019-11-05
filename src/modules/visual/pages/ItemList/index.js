import { API_BASE_URL } from '@/config';
import BackToTop from '@/components/BackToTop.vue';
import Toolbar from './Toolbar.vue';
import Preview from './Preview.vue';
import Selector from './Selector.vue';

export default {
  components: {
    Toolbar,
    Preview,
    Selector,
    BackToTop,
  },
  props: {
    isManager: { default: true },
  },
  inject: {
    viewEditor: {
      default: null,
    },
  },
  provide() {
    return {
      filter: this.filter,
    };
  },
  data() {
    return {
      filter: {
        keyword: '',
        catalogId: '',
        isEnabled: [],
      },
      API_BASE_URL,
      loading: true,
      activeCatalogIds: ['none', 0],
      activeItem: {},
      editTitleIndex: -1,
      editTitle: '',
    };
  },
  computed: {
    componentList() {
      let enabled = true;
      if (this.isManager) {
        enabled = this.filter.isEnabled.length ? !!this.filter.isEnabled[0] : null;
      }
      return this.$store.getters['item/itemsSorted']({
        keyword: this.filter.keyword,
        catalog: this.filter.catalogId,
        enabled,
        invalid: this.isManager,
      });
    },
    listMode() {
      return this.$store.state.item.listMode;
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      if (this.$store.state.item.components.length) {
        this.activeCatalogIds = [...this.activeCatalogIds, ...this.$store.state.catalog.component.map(item => item.id)];
        this.loading = false;
      }
      Promise.all([this.$store.dispatch('catalog/fetch', 'component'), this.$store.dispatch('item/fetchItems', this.isManager)]).catch((e) => {
        this.$message.error('组件加载失败');
      }).finally(() => {
        this.activeCatalogIds = [...this.activeCatalogIds, ...this.$store.state.catalog.component.map(item => item.id)];
        this.loading = false;
      });
    },
    onDeleteItem(item) {
      this.$confirm(`是否删除该组件<${item.title}>`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('item/deleteItem', item).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.$refs.toolbar.hide();
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败!',
          });
        });
      });
    },
    onToolbar(item) {
      this.activeItem = item;
      this.$refs.toolbar.open(item);
    },
    openPreview(item) {
      if (!item) {
        this.$refs.preview.open(this.activeItem);
        return;
      }
      if (!item.componentKey) return;
      this.activeItem = item;
      this.$refs.preview.open(item);
    },
    onChooseItem(item) {
      if (!this.isManager) {
        this.viewEditor.onChooseItem(item);
        return;
      }
      this.openPreview(item);
    },
    onUpdateCatalog(catalog) {
      const oldTitle = catalog.title;
      const newTitle = this.editTitle;
      if (oldTitle !== newTitle && newTitle !== '') {
        this.$store.dispatch('catalog/update', Object.assign(catalog, {
          title: newTitle,
        })).then(() => {
          this.$store.dispatch('catalog/fetch', 'component');
        }).catch((e) => {
          Object.assign(catalog, {
            title: oldTitle,
          });
          this.$message.error(e.message);
        }).finally(() => {
          this.editTitleIndex = -1;
        });
      } else {
        this.editTitleIndex = -1;
      }
    },
    onEditCatalog(index, catalog) {
      this.editTitleIndex = index;
      this.editTitle = catalog.title;
      this.$nextTick(() => {
        this.$refs[`editTitle${index}`][0].focus();
      });
    },
  },
};
