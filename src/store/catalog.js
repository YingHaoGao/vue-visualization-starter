import http from '@/../core/http';

export const namespaced = true;
export const state = () => ({
  component: [],
  view: [],
  myview: [],
});
export const mutations = {
  set(state, payload) {
    Object.keys(payload).forEach((k) => {
      state[k] = payload[k];
    });
  },
};
export const actions = {
  async fetch({ commit }, type = 'view') {
    const { data } = await http.get(`/tier/${type}`);
    if (data.status !== 'OK') throw new Error();
    const catalogs = data.data;
    commit('set', { [type]: catalogs });
  },
  async update(context, payload) {
    const { data } = await http.put('/tier', payload);
    if (data.status !== 'OK') throw new Error();
    if (data.code !== '0') throw new Error(data.msg);
  },
  async add(context, payload) {
    const { data } = await http.post('/tier', payload);
    if (data.status !== 'OK') throw new Error();
    if (data.code !== '0') throw new Error(data.msg);
  },
  async delete(context, payload) {
    const { data } = await http.delete('/tier', { data: [payload.id] });
    if (data.status !== 'OK') throw new Error();
  },
};
