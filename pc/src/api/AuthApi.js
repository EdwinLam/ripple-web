import fetch from './fetch'
export default class AuthApi {
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
}