import fetch from './fetch'

export default class BaseApi {
  constructor (key) {
    if (key) { this.key = key }
  }
  list (params) {
    return fetch({
      url: '/api/'+this.key,
      method: 'get',
      params
    })
  }
  add (data) {
    return fetch({
      url: '/api/'+this.key,
      method: 'post',
      data
    })
  }
  update(data) {
    return fetch({
      url: '/api/'+this.key+'/'+data.id,
      method: 'put',
      data
    })
  }
  destroy (id) {
    return fetch({
      url: '/api/'+this.key+'/' + id,
      method: 'delete'
    })
  }
}