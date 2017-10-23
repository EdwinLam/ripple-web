import '@/css/style.css'
import routerService from '@/service/routerService'
import commonUtil from 'utils/commonUtil'
import authApi from 'api/authApi'
import 'components/common/common-header'
const root = avalon.define({
  $id: 'root',
  currPage: '',
  userInfo:{},
  /* 初始化 */
  init: async function() {
    //获取用户信息
    const res = await authApi.getUserInfo()
    Object.keys(res.values.userInfo).forEach(function(key){
      if(!res.values.userInfo[key]) delete res.values.userInfo[key]
    })
    root.userInfo = res.values.userInfo
    const rootVm = root
    const defaultIndex = '/index'
    routerService.initRouter({rootVm, defaultIndex})
  }
})

/* 初始化执行 */
avalon.ready(function () {
  layui.use(['layer','element'], function(){
    root.init()
    avalon.scan(document.body)
  })
})
