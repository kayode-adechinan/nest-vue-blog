import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let auth = window.localStorage.getItem('auth');
auth = auth ? JSON.parse(auth) : null;

export default new Vuex.Store({
  state: {
    user: auth?.user || null,
    accessToken: auth?.accessToken || null,
  },
  mutations: {
    setAuth(state, payload) {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      this.commit('perSist');
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      this.commit('perSist');
    },
    perSist(state) {
      window.localStorage.setItem('auth', JSON.stringify(state));
    },
  },
  actions: {},
  modules: {},
});
