import '@/css/login.css'
import AuthApi from 'api/AuthApi'
import AuthService from '@/service/AuthService'
import COM from '@/service/CommonService'

const loginVm = avalon.define({
  $id: 'loginVm',
  phone: '',
  password: '',
  init: function () {

  },
  login: function () {
    loginVm.validate.onManual()
  },
  validate: {
    onValidateAll:async function(reasons) {
      if(reasons.length) {
        const message = reasons[0].message
        COM.topAlert({message})
        return false;
      } else {
        const res = await AuthApi.login(loginVm.phone,loginVm.password)
        const message = res.message
        if(res.success){
          AuthService.setToken(res.data.token)
          window.location.href='/index.html'
        }else{
          COM.topAlert({message})
        }
      }
    }
  }

})

/* 初始化执行 */
avalon.ready(function () {
  loginVm.init()
  avalon.scan(document.body)
})
