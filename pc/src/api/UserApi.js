import fetch from './fetch'
import BaseApi from './BaseApi'

export default class UserApi extends BaseApi{
  constructor () {
    super('user')
  }
  getUserInfo () {
    return fetch({
      url: '/api/user/getUserInfo',
      method: 'get'
    })
  }
}