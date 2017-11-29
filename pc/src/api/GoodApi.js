import fetch from './fetch'
import BaseApi from './BaseApi'

export default class GoodApi extends BaseApi{
  constructor () {
    super('good')
  }
  getUserInfo () {
    return fetch({
      url: '/api/ugser/getUserInfo',
      method: 'get'
    })
  }
}