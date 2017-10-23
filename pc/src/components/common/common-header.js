/* global require */
/**
 * ------------------------------------------------------------------
 * 导航条菜单
 * ------------------------------------------------------------------
 */
const template = require('./common-header.html')
avalon.component('common-header', {
  template: template,
  defaults: {
    projectName:'Ripple',
    display: false,
    userInfo:{}
  }
})
