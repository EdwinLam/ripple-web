const App = getApp()
export default class CartApi{
  static addToCart(data){
    return App.HttpService.postRequest('/auth/cart/addToCart', {data})
  }

}