export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    replace(state, payload) {
      state.list = payload;
    },
  },
  actions: {},
};
