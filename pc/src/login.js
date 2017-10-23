import '@/css/login.css'
import authApi from 'api/authApi'
import authUtil from 'utils/authUtil'
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
        layer.alert(reasons[0].message, {icon: 2})
        return false;
      } else {
        const res = await authApi.login(loginVm.phone,loginVm.password)
        if(res.success){
          authUtil.setToken(res.values.token)
          window.location.href='/index.html'
        }else{
          layer.alert(res.message, {icon: 2})
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
