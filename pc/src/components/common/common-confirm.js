/* global require */
/**
 * ------------------------------------------------------------------
 * 提示
 * ------------------------------------------------------------------
 */
const template = require('./common-confirm.html')
avalon.component('common-confirm', {
  template: template,
  defaults: {
    message:'',
    afterConfirm:avalon.noop,
    openInit: function ({message,afterConfirm}) {
      this.message=message
      this.afterConfirm=afterConfirm
      $('#common-confirm').modal('show')
    },
    confirm:function(){
      $('#common-confirm').modal('hide')
      this.afterConfirm()
    }
  }
})
