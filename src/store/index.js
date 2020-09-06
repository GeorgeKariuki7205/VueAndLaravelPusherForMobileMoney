import Vue from 'vue'
import Vuex from 'vuex'
import PayBill from './modules/PayBill'
import LipaNaMpesa from './modules/LipaNaMpesa'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    PayBill,
    LipaNaMpesa,
  }
})
