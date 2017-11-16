import httpService from '../helpers/HttpService'
export default class GoodApi{
  static saveOrder({goodSaleItems,address}){
    return httpService.postRequest('/api/order/saveOrder', {
      data:{goodSaleItems,address}
    })
  }
}