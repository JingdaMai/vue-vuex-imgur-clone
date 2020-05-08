import api from '../../api/imgur';
import qs from 'qs';
import { router } from '../../main';

const state = {
  token: window.localStorage.getItem('imgur_token')
};

const getters = {
 isLoggedIn: (state) => !!state.token // convert to boolean
};

const actions = {
  login() {
    api.login();
  },
  finalizeLogin({ commit }, hash) {
    const queryObject = qs.parse(hash.replace('#', ''));
    commit('setToken', queryObject.access_token);
    window.localStorage.setItem('imgur_token', queryObject.access_token);
    router.push('/');
  },
  logout({ commit }) {
    commit('setToken', null);
    window.localStorage.removeItem('imgur_token');
  },
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};