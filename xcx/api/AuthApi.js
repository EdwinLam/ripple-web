import httpService from '../helpers/HttpService'
export default class AuthApi{
  static login(data){
    return httpService.postRequest('/auth/login', {
      data
    })
  }
}