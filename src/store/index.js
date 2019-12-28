import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.user(Vuex)

const store=new Vue.store({
  modules: {
    user
  }
})

export default store