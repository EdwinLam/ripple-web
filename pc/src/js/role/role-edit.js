import template from './role-edit.html'
import RoleApi from 'api/RoleApi'
import CommonUtil from 'utils/CommonUtil'

avalon.component('role-edit', {
    template: template,
    defaults: {
      el:{},
      afterSave:avalon.noop,
      openInit: function ({afterSave,el}) {
        $('#role-edit').modal('show')
        this.afterSave=afterSave
        this.el = avalon.mix({},el)
      },
      save: async function () {
        const res = await RoleApi.update(this.el)
        if(res.success){
          $('#role-edit').modal('hide')
          this.afterSave()
        }
        CommonUtil.alert({message:res.message})
      }
    }
});