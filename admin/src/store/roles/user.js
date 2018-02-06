import {nodeApi,authApi} from '@/api/index'
import Cookies from 'js-cookie';
import {router} from '@/router/index';
import iView from 'iview';

const state = {
  status:0,
  authItems:[],
}

// getters
const getters = {

}

const actions = {
  async getUserAuth({commit}){
    return new Promise(async (resolve, reject) => {
      const res = await nodeApi.getUserAuth()
      commit("changeAuthItems", {authItems: res.data})
      resolve()
    })
  },
  async login({commit},{phone,password}){
    const res = await authApi.login({phone,password})
    if(res.success){
      commit("loginSuccess",{message:res.message,phone,password})
    }else{
      commit("loginFail",{message:res.message})
    }
  },
  async createPermission({commit},{phone,password}){
      const saveRes = await authApi.save({phone, password})
  }
}
const mutations = {
  changeAuthItems (state,{authItems}) {
    state.authItems = authItems;
  },
  loginFail(state,{message}){
    Cookies.remove('user');
    Cookies.remove('password');
    Cookies.remove('access');
    iView.Message.error(message)
  },
  loginSuccess(state,{phone,password,message}){
    Cookies.set('user',phone)
    Cookies.set('password', password)
    router.push({
      name: 'home_index'
    })
    iView.Message.success(message)
  },
  logout (state, vm) {
    Cookies.remove('user');
    Cookies.remove('password');
    Cookies.remove('access');
    // 恢复默认样式
    let themeLink = document.querySelector('link[name="theme"]');
    themeLink.setAttribute('href', '');
    // 清空打开的页面等数据，但是保存主题数据
    let theme = '';
    if (localStorage.theme) {
      theme = localStorage.theme;
    }
    localStorage.clear();
    if (theme) {
      localStorage.theme = theme;
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}