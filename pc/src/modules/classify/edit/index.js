import template from './index.html'
import API from 'api/index'
import COM from 'service/CommonService'
avalon.component('classify-edit', {
    template: template,
    defaults: {
      id:'classify-edit',
      el:{},
      afterSave:avalon.noop,
      openInit: function ({afterSave,el}) {
        $('#user-edit').modal('show')
        this.afterSave=afterSave
        this.el = avalon.mix({},el)
      },
      save: async function () {
        const res = await API['classify'].update(this.el)
        if(res.success){
          $('#user-edit').modal('hide')
          this.afterSave()
        }
        COM.topAlert({message:res.message})
      }
    }
});