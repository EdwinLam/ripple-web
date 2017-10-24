/* global require */
/**
 * ------------------------------------------------------------------
 * 提示
 * ------------------------------------------------------------------
 */
const template = require('./common-alert.html')
avalon.component('common-alert', {
  template: template,
  defaults: {
    message:'',
    openInit: function ({message}) {
      this.message=message
      $('#common-alert').modal('show')
    }
  }
})
