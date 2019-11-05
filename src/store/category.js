export default {
  namespaced: true,
  state: {
    data: [],
    allow: [],
  },
  mutations: {
    set(state, payload) {
      const recursion = (items, newData = []) => {
        items.forEach((item) => {
          if (item.children && item.children.length) {
            recursion(item.children, newData);
          } else {
            newData.push(item.path);
          }
        });
        return newData;
      };
      const allow = recursion(payload);
      state.allow = allow;
      state.data = payload;
    },
  },
};
