import fetch from './fetch'
import baseApi from './baseApi'

export default class GroupApi extends baseApi{

  constructor () {
    super('node')
  }

  add(data) {
    return fetch({
      url: '/api/node/create',
      method: 'post',
      data
    })
  }

  updateById({id,data}) {
    return fetch({
      url: '/api/node/'+id,
      method: 'post',
      data
    })
  }

  getCanSelectNodes(data) {
    console.log(data)
    return fetch({
      url: '/api/node/getCanSelectNodes',
      method: 'get',
      params:data
    })
  }

}