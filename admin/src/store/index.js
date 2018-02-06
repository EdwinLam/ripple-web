import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import user from './roles/user'
import page from './roles/page'
export default new Vuex.Store({
    modules: {
      page,
      user
    }
})