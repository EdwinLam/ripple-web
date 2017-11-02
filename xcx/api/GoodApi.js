import httpService from '../helpers/HttpService'
export default class GoodApi{
  static indexGoodShow(size){
    return httpService.getRequest('/api/good/indexGoodShow', {
      data:{size}
    })
  }

  static queryByKeyWord(keyWord){
    return httpService.getRequest('/api/good/queryByKeyWord', {
      data:{keyWord}
    })
  }

}