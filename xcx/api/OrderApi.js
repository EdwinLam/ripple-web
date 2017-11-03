import httpService from '../helpers/HttpService'
export default class GoodApi{
  static saveOrder({goodItems,address}){
    return httpService.postRequest('/api/order/saveOrder', {
      data:{goodItems,address}
    })
  }
}