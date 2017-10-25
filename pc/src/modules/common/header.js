/* global require */
/**
 * ------------------------------------------------------------------
 * 导航条菜单
 * ------------------------------------------------------------------
 */
const template = require('./header.html')
avalon.component('header', {
  template: template,
  defaults: {
    projectName:'Ripple',
    display: false,
    userInfo:{}
  }
})
