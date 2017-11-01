const App = getApp()
export default class CartApi{
  static addToCart(data){
    return App.HttpService.postRequest('/api/cart/addToCart', {data})
  }

  static setCartGood({goodId,goodNum}){
    const data = {goodId,goodNum}
    return App.HttpService.postRequest('/api/cart/setCartGood', {data})
  }

  static getUserCart(){
    return App.HttpService.postRequest('/api/cart/getUserCart')
  }


}