import httpService from '../helpers/HttpService'
export default class GoodApi{
  static setDefaultAddress({id}){
    return httpService.postRequest('/api/address/setDefaultAddress', {
      data:{id}
    })
  }

  static getDefaultAddress(){
    return httpService.getRequest('/api/address/getDefaultAddress')
  }

}