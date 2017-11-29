import '@/css/style.css'
import RouterService from '@/service/RouterService'
import 'modules/common/header'
import 'modules/common/menu'
import './filter'
import UserApi from 'api/UserApi'
const root = avalon.define({
  $id: 'root',
  currPage: '',
  userInfo:{},
  /* 初始化 */
  init: async function() {
    //获取用户信息
    // const res = await UserApi.getUserInfo()
    // Object.keys(res.values.userInfo).forEach(function(key){
    //   if(!res.values.userInfo[key]) delete res.values.userInfo[key]
    // })
    // root.userInfo = res.values.userInfo
    const rootVm = root
    const defaultIndex = '/index.html#!/user/index'
    RouterService.initRouter({rootVm, defaultIndex})
  }
})

/* 初始化执行 */
avalon.ready(function () {
  root.init()
  avalon.scan(document.body)
})
