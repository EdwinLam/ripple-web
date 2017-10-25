/* global require */
/**
 * ------------------------------------------------------------------
 * 导航条菜单
 * ------------------------------------------------------------------
 */
const template = require('./menu.html')
avalon.component('menu', {
  template: template,
  defaults: {
    projectName:'Ripple',
    display: false,
    userInfo:{}
  }
})
