import template from './user-add.html'
import API from 'api/index'
import COM from 'service/CommonService'

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
        const res = await API['user'].add(data)
        if(res.success){
          $('#user-add').modal('hide')
          this.afterSave()
        }
        COM.topAlert({message:res.message})
      }
    }
});