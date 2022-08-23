import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    natija: {
            score:0
    }
  },
  getters: {
  },
  mutations: {
    setNatija(state, score){
      var a = score
      state.natija.score+=a;

    },
    restart(state){
      state.natija.score=0
    }
  },
  actions: {
  },
  modules: {
  }
})
