import httpService from '../helpers/HttpService'
export default class CartApi{
  static addToCart({goodSaleId}){
    const data ={goodSaleId}
    return httpService.postRequest('/api/cart/addToCart', {data})
  }

  static setCartGood({goodSaleId,goodNum}){
    const data = {goodSaleId,goodNum}
    return httpService.postRequest('/api/cart/setCartGood', {data})
  }

  static getUserCart(){
    return httpService.postRequest('/api/cart/getUserCart')
  }

  static clearCart(){
    return httpService.postRequest('/api/cart/clearCart')
  }

  static delCartGood(goodId){
    return httpService.postRequest('/api/cart/delCartGood',{data:{goodId}})
  }
}