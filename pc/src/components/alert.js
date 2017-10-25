/* global require */
/**
 * ------------------------------------------------------------------
 * 提示
 * ------------------------------------------------------------------
 */
const template = require('./alert.html')
avalon.component('alert', {
  template: template,
  defaults: {
    message:'',
    openInit: function ({message}) {
      this.message=message
      $('#alert').modal('show')
    }
  }
})
