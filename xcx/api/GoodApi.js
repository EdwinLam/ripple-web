const App = getApp()
export default class GoodApi{
  static indexGoodShow(size){
    return App.HttpService.getRequest('/api/good/indexGoodShow', {
      data:{size}
    })
  }

  static queryByKeyWord(keyWord){
    return App.HttpService.getRequest('/api/good/queryByKeyWord', {
      data:{keyWord}
    })
  }

}