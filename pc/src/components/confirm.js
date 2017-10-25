/* global require */
/**
 * ------------------------------------------------------------------
 * 提示
 * ------------------------------------------------------------------
 */
const template = require('./confirm.html')
avalon.component('confirm', {
  template: template,
  defaults: {
    message:'',
    afterConfirm:avalon.noop,
    openInit: function ({message,afterConfirm}) {
      this.message=message
      this.afterConfirm=afterConfirm
      $('#confirm').modal('show')
    },
    confirm:function(){
      $('#confirm').modal('hide')
      this.afterConfirm()
    }
  }
})
