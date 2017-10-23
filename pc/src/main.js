import '@/css/style.css'
import routerService from '@/service/routerService'
import UserApi from 'api/UserApi'
import 'components/common/common-header'
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
    const defaultIndex = '/index'
    routerService.initRouter({rootVm, defaultIndex})
  }
})

/* 初始化执行 */
avalon.ready(function () {
  root.init()
  avalon.scan(document.body)
})
