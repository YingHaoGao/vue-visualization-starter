export default {
  namespaced: true,
  state: {
    actions: {},
  },
  mutations: {
    merge(state, payload) {
      state.actions = payload;
    },
  },
};
