import fetch from './fetch'
export default class RoleApi {
  static queryPage () {
    return fetch({
      url: '/api/role/queryPage',
      method: 'get'
    })
  }
  static add (data) {
    return fetch({
      url: '/api/role/add',
      method: 'post',
      data
    })
  }
  static update(data) {
    return fetch({
      url: '/api/role/'+data.id,
      method: 'post',
      data
    })
  }
  static destroy (id) {
    return fetch({
      url: '/api/role/' + id,
      method: 'delete'
    })
  }
}