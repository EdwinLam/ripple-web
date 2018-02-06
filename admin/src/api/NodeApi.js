import fetch from './fetch'

export default class NodeApi {

  getUserAuth () {
    return fetch({
      url: '/api/node/all',
      method: 'get',
      data:{
      }
    })
  }


}