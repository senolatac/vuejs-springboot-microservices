import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: '',
    message: ''
  },
  getters: {
    alertStyle(state) {
      return 'alert ' + state.type;
    }
  },
  mutations: {
    success(state, message) {
      state.type = 'alert-success';
      state.message = message;
    },
    error(state, message) {
      state.type = 'alert-danger';
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    }
  },
  actions: {
    success({commit}, message) {
      commit('success', message);
    },
    error({commit}, message) {
      commit('error', message);
    },
    clear({commit}) {
      commit('clear');
    }
  }
})
