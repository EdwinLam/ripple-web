import template from './user-edit.html'
import UserApi from 'api/UserApi'
import CommonUtil from 'utils/CommonUtil'

avalon.component('user-edit', {
    template: template,
    defaults: {
      el:{},
      afterSave:avalon.noop,
      openInit: function ({afterSave,el}) {
        $('#user-edit').modal('show')
        this.afterSave=afterSave
        this.el = avalon.mix({},el)
      },
      save: async function () {
        const res = await UserApi.update(this.el)
        if(res.success){
          $('#user-edit').modal('hide')
          this.afterSave()
        }
        CommonUtil.alert({message:res.message})
      }
    }
});