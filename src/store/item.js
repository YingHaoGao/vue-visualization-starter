import http from '@/../core/http';
import { getItemConf, itemsConf } from '@/items';

const checkKeyword = (keyword, item) => {
  if (!keyword || !item) return true;
  const work = keyword.toLowerCase();
  const {
    title = '',
    componentKey = '',
  } = item;
  if (title && title.toLowerCase().indexOf(work) >= 0) return true;
  else if ((componentKey && componentKey.toLowerCase().indexOf(work) >= 0)) return true;
  return false;
};

const category = {
  uncategorized: {
    id: 0,
    title: '未分类的',
  },
  none: {
    id: 'none',
    title: '未添加的',
  },
};
export default {
  namespaced: true,
  state: {
    components: [],
    listMode: 'grid',
  },
  getters: {
    // filter
    // keyword: this.keyword,
    // catalog: this.catalogId,
    // enabled: this.isEnabled,
    // invalid todo true失去关联的组件
    itemsSorted: (state, getters, rootState) => (filter) => {
      const list = {};
      const componentSort = {}; // 组件分类
      const itemKeys = Object.keys(itemsConf); // 处理未添加的组件
      if (state.components.length) {
        state.components.forEach((item) => {
          if (filter.invalid === false && itemKeys.indexOf(item.componentKey) < 0) return;
          if (!componentSort[item.tierId]) componentSort[item.tierId] = [];
          if (filter.enabled === true) {
            if (item.isEnabled === true) {
              if (checkKeyword(filter.keyword, item)) {
                componentSort[item.tierId].push(item);
              }
            }
          } else if (filter.enabled === false) {
            if (item.isEnabled === false) {
              if (checkKeyword(filter.keyword, item)) {
                componentSort[item.tierId].push(item);
              }
            }
          } else if (checkKeyword(filter.keyword, item)) {
            componentSort[item.tierId].push(item);
          }
          const itemIndex = itemKeys.indexOf(item.componentKey);
          if (itemIndex >= 0) {
            itemKeys.splice(itemIndex, 1);
          }
        });
        // 未添加的
        if (itemKeys.length) {
          const noneItems = [];
          itemKeys.forEach((k) => {
            const item = itemsConf[k];
            if (checkKeyword(filter.keyword, item)) {
              noneItems.push(item);
            }
          });
          componentSort.none = noneItems;
        }
      }
      if (rootState.catalog.component.length) {
        rootState.catalog.component.forEach((item) => {
          list[`id_${item.id}`] = Object.assign({}, item, {
            children: componentSort[item.id] ? componentSort[item.id] : [],
          });
        });
        // 未分类的
        if (componentSort[0] && componentSort[0].length) {
          list.id_0 = Object.assign(category.uncategorized, {
            children: componentSort[0],
          });
        }
      } else {
        // 未分类的
        list.id_0 = Object.assign(category.uncategorized, {
          children: state.components,
        });
      }
      // 未添加的
      if (itemKeys.length && filter.enabled === null) {
        const noneItems2 = [];
        itemKeys.forEach((k) => {
          const item = itemsConf[k];
          if (checkKeyword(filter.keyword, item)) {
            noneItems2.push(Object.assign({}, item));
          }
        });
        list.none = Object.assign(category.none, {
          children: noneItems2,
        });
      }
      const catalogId = `${filter.catalog === 'none' || filter.catalog === '' ? '' : 'id_'}${filter.catalog}`;
      if (catalogId && list[catalogId]) {
        return [list[catalogId]];
      } else if (filter.catalog === 0) {
        return [Object.assign(category.uncategorized, {
          children: [],
        })];
      } else if (filter.catalog === 'none') {
        return [Object.assign(category.uncategorized, {
          children: [],
        })];
      }
      return list;
    },
  },
  mutations: {
    setComponents(state, payload) {
      state.components = payload;
    },
    deleteComponent(state, index) {
      state.components.splice(index, 1);
    },
    setListMode(state, payload) {
      state.listMode = payload;
    },
  },
  actions: {
    async fetchItems({ rootState, rootGetters, commit }, isManager = true) {
      let url = '/component';
      if (!rootGetters.isSuperAdmin && isManager === false) {
        url = '/findUserComponent';
      }
      // const url = '/component';
      const { data } = await http.get(url);
      if (data.status !== 'OK') throw new Error();
      const components = data.data.map((component) => {
        const itemConf = getItemConf(component.componentKey);
        if (!itemConf) {
          component.componentKey = '';
        } else {
          let config = {};
          try {
            config = JSON.parse(component.config);
          } catch (e) {
            console.error(e);
          }
          component.options = itemConf.options || {};
          Object.assign(component, config, {
            isEnabled: Boolean(component.isEnabled - 0),
            tierId: component.tierId - 0,
          });
          Object.keys(itemConf).forEach((word) => {
            component[word] = (typeof component[word] !== 'undefined') ? component[word] : itemConf[word];
          });
        }
        return component;
      });
      commit('setComponents', components);
      return Promise.resolve();
    },
    async deleteItem({ dispatch }, payload) {
      const { data } = await http.delete('/component', { data: [payload.id] });
      if (data.status !== 'OK') throw new Error();
      dispatch('fetchItems');
    },
  },
};
