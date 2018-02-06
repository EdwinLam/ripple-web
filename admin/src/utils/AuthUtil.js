import Cookies from 'js-cookie'
import  {JWT_KEY } from './Constants'
import Main from '@/views/Main'
export default class AuthUtil {
  static getToken() {
    return Cookies.get(JWT_KEY)
  }
  static setToken(token) {
    return Cookies.set(JWT_KEY, token)
  }
  static removeToken() {
    return Cookies.remove(JWT_KEY)
  }
  static initRouter() {
    return Cookies.remove(JWT_KEY)
  }

  static autoSort(sourceData){
    sourceData.sort(function(a,b){
      return a.sort - b.sort
    })
    sourceData.forEach(function(el){
      if(el.children){
        autoSort(el.children)
      }
    })
  }
  findOrigin(sourceData){
    let origin =''
    sourceData.every(function (el) {
      if(el.level == 2){
        origin=el.path
      }else if(el.children){
        origin=this.findOrigin(el.children)
      }
      if(origin !== '') return false
      else return true
    })
    return origin
  }

  parsePassport(sourceData) {
    let hash = {}
    let filterSourceData = []
    let list = []
    let origin = ''
    sourceData.forEach(function(el){
      el.children = []
      hash[el.code] = el
    })
    filterSourceData.forEach(function(el){
      let parentEl = hash[el.pCode]
      if(parentEl) {
        parentEl.children.push(Object.assign(el,{component: () => import('@/views/'+el.path+'/access.vue')}))
      }else{
        list.push( Object.assign(el,{component:Main}))
      }
    })
    this.autoSort(list)
    origin = this.findOrigin(list)
    return {list,origin}
  }
}