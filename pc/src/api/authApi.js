import fetch from './fetch'

export default class authApi {
  static login (phone, password) {
    const data = {
      phone,
      password
    }
    return fetch({
      url: '/auth/login',
      method: 'post',
      data
    })
  }

   static logout () {
    return fetch({
      url: '/auth/logout',
      method: 'post'
    })
  }

   static getUserInfo () {
    return fetch({
      url: '/api/user/getUserInfo',
      method: 'get',
    })
  }

}