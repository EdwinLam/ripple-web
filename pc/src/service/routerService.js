import * as avalon from 'avalon2'

export default class RouterService {
  constructor() {
    this.initRouter = this.initRouter.bind(this)
  }

  static initRouter({rootVm,defaultIndex}) {
    if(!defaultIndex){
      avalon.error('[路由启动失败!初始化路由设置参数必须指定默认首页defaultIndex]')
      return
    }
    if(!rootVm){
      avalon.error('[路由启动失败!初始化失败!需要配置顶层vm root]')
      return
    }
    let ruleStr = ''
    for (let i = 0; i < 5; i++) {
      ruleStr += '/:key'
      avalon.router.add(ruleStr, function () {
        const hash = location.hash.replace(/#!?/, '')
        const args = Array.prototype.slice.call(arguments)
        const key = hash === '' ? '' : args.join('/')
        try {
          var vm = require('@/js/' + key + '.js')
          rootVm.currPage = require('@/html/' + key + '.html')
          vm.init()
        } catch (e) {
          avalon.error(e)
          // window.location.href="/";
        }
      })
    }
    // 开启路由
    avalon.history.start({
      root: '/'
    })
  }
}