import template from './node-edit.html'
import NodeApi from 'api/NodeApi'
import CommonService from 'service/CommonService'

avalon.component('node-edit', {
    template: template,
    defaults: {
      el:{},
      afterSave:avalon.noop,
      openInit: function ({afterSave,el}) {
        $('#node-edit').modal('show')
        this.afterSave=afterSave
        this.el = avalon.mix({},el)
      },
      save: async function () {
        const res = await NodeApi.update(this.el)
        if(res.success){
          $('#node-edit').modal('hide')
          this.afterSave()
        }
        CommonService.alert({message:res.message})
      }
    }
});