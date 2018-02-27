export default class NodeUtil {
  static filterRouterItems(authItems){
    let routerItems = []
    authItems.forEach(function (el) {
      if (el.path) {
        const routerEl = Object.assign({}, el, {component: () => import('@/views/' + el.componentPath)})
        const routerLinkArray = routerEl.link.split(",")
        const outerId = routerLinkArray.length > 1 ? parseInt([1]) : -1
        if (outerId != -1 && outerId != routerEl.id)
          routerEl.parentId = outerId
        routerItems.push(routerEl)
      }
    })
    return routerItems
  }
  static filterTagItems(authItems){
    let tagList = []
    authItems.forEach(function(el){
      if(el.isModule==0){
        tagList.push(el)
      }
    })
    return tagList
  }
}