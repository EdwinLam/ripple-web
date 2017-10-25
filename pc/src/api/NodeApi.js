import fetch from './fetch'
export default class NodeApi {
  static queryPage () {
    return fetch({
      url: '/api/node/queryPage',
      method: 'get'
    })
  }
  static add (data) {
    return fetch({
      url: '/api/node/add',
      method: 'post',
      data
    })
  }
  static update(data) {
    return fetch({
      url: '/api/node/'+data.id,
      method: 'post',
      data
    })
  }
  static destroy (id) {
    return fetch({
      url: '/api/node/' + id,
      method: 'delete'
    })
  }
  static getAllModules () {
    return fetch({
      url: '/api/node/getAllModules',
      method: 'get'
    })
  }
}