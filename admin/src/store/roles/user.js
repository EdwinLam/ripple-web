import {nodeApi,authApi} from '@/api/index'
import Cookies from 'js-cookie';
import {router} from '@/router/index';
import iView from 'iview';

const state = {
  status:0,
  authItems:[],
  userInfo:{
    messageCount:3,
    userName:'小明',
    avatar:'',
  }
}

// getters
const getters = {

}

const actions = {
  async initUser({commit}){
    return new Promise(async (resolve, reject) => {
      const res = await nodeApi.getUserAuth()
      commit("inLine", {authItems: res.data})
      resolve(res.data)
    })
  },
  async login({commit},{phone,password}){
    commit("identify",{phone,password})
    const res = await authApi.login({phone,password})
    if(res.success){
      const authRes = await nodeApi.getUserAuth()
      commit("inLine",{authItems: authRes.data})
      router.push({
        name: 'home_index'
      })
      iView.Message.success(message)
    }else{
      commit("offLine")
      iView.Message.error(message)
    }
  },
  async createPermission({commit},{phone,password}){
      const saveRes = await authApi.save({phone, password})
  }
}
const mutations = {
  offLine(state){
    Cookies.remove('user');
    Cookies.remove('password');
    Cookies.remove('access');
  },
  identify(state,{phone,password}){
    Cookies.set('user',phone)
    Cookies.set('password', password)
  },
  inLine(state,{authItems}){
    state.authItems = authItems;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}