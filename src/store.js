import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  state: {
    payments: []
  },
  getters: {
    getPayments: state => state.payments,
  },
  mutations: {
    setPayment: (state, resp) => {
      state.payments.push(resp);
    }
  },
  actions: {
    addPayment: ( {commit}, data) => {
      return new Promise((resolve, reject) => {
        try {
          commit('setPayment', data);
          resolve();
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  plugins: [createPersistedState()]
})
