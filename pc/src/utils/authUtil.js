import Cookies from 'js-cookie'
import  {JWT_KEY } from './constants'

export default class authUtil {
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
}