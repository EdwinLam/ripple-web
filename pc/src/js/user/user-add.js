import template from './user-add.html'
import UserApi from 'api/UserApi'
import CommonUtil from 'utils/CommonUtil'

avalon.component('user-add', {
    template: template,
    defaults: {
      userName:'',
      phone:'',
      password:'',
      afterSave:avalon.noop,
      openInit: function ({afterSave}) {
        $('#user-add').modal('show')
        this.afterSave=afterSave
      },
      save: async function () {
        const data = {
          userName: this.userName,
          phone: this.phone,
          password: this.password
        }
        const res = await UserApi.add(data)
        if(res.success){
          $('#user-add').modal('hide')
          this.afterSave()
        }
        CommonUtil.alert({message:res.message})
      }
    }
});