const App = getApp()
export default class AuthApi{
  static login(data){
    return App.HttpService.postRequest('/auth/login', {
      data
    })
  }
}