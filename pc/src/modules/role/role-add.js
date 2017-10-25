import template from './role-add.html'
import RoleApi from 'api/RoleApi'
import CommonService from 'service/CommonService'

avalon.component('role-add', {
    template: template,
    defaults: {
      roleName:'',
      afterSave:avalon.noop,
      openInit: function ({afterSave}) {
        $('#role-add').modal('show')
        this.afterSave=afterSave
      },
      save: async function () {
        const data = {
          roleName: this.roleName
        }
        const res = await RoleApi.add(data)
        if(res.success){
          $('#role-add').modal('hide')
          this.afterSave()
        }
        CommonService.alert({message:res.message})
      }
    }
});