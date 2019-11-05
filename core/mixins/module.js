import store from 'core/store';
import category from 'core/.glob/category';
import { isArray, isFunction } from 'core/util';

export default {
  created() {
    this.moduleName = '';
  },
  methods: {
    openModuleSelector() {
      this.$router.push('/modules');
    },
    openModule(name) {
      this.$router.push(`/${name}`);
    },
    async loadModule(name) {
      if (name === this.moduleName) return;
      this.moduleName = name;
      await this.loadMenu();
    },
    async loadMenu() {
      // store.commit('category/set', []);
      if (category[this.moduleName]) {
        let moduleMenu = category[this.moduleName];
        moduleMenu = moduleMenu.default || moduleMenu;
        let menus = [];
        if (isArray(moduleMenu)) {
          menus = moduleMenu;
        } else if (isFunction(moduleMenu)) {
          menus = await moduleMenu();
        }
        store.commit('category/set', menus);
      }
    },
    getMenu() {
      return this.$store.state.category.menus;
    },
  },
};
