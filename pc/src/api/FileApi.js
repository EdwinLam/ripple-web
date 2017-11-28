import fetch from './fetch'
import BaseApi from './BaseApi'

export default class FileApi extends BaseApi{
  constructor () {
    super('user')
  }
  getFileByMD5 (params) {
    return fetch({
      url: '/api/file/getFileByMD5',
      method: 'get',
      params
    })
  }
}