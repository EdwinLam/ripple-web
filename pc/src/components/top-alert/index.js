/* global require */
/**
 * ------------------------------------------------------------------
 * 提示
 * ------------------------------------------------------------------
 */
import _ from 'lodash'
const template = require('./index.html')
avalon.component('top-alert', {
  template: "<div></div>",
  defaults: {
    message:'',
    alert: function ({message}) {
      this.message=message
      const alertEl=$(template.replace("{{message}}",message))
      alertEl.alert()
      $('body').append(alertEl)
      _.delay(()=>{
        alertEl.alert('close')
      },1000)
    }
  }
})
