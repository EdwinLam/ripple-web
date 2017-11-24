import fetch from './fetch'
import BaseApi from './BaseApi'

export default class FileApi extends BaseApi{
  constructor () {
    super('user')
  }
  getFileByMd5 (params) {
    return fetch({
      url: '/api/file',
      method: 'get',
      params
    })
  }
}