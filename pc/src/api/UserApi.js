import fetch from './fetch'
export default class AuthApi {
  static getUserInfo () {
    return fetch({
      url: '/api/user/getUserInfo',
      method: 'get'
    })
  }
  static queryPage () {
    return fetch({
      url: '/api/user/queryPage',
      method: 'get'
    })
  }
  static add (data) {
    return fetch({
      url: '/api/user/add',
      method: 'post',
      data
    })
  }
}