import alertTemplate from './template/topAlert.html'
import _ from 'lodash'
export default class commonService {
    constructor() {
    }
    static getResUrl(path){
      return process.env.RES_URL+path
    }
  static alert(config){
    avalon.vmodels['commonAlert'].openInit(config)
  }
    static topAlert({message}){
      const alertEl=$(alertTemplate.replace("{{message}}",message))
      alertEl.alert()
      $('.alertArea').prepend(alertEl)
      _.delay(()=>{
        alertEl.alert('close')
      },1000)
    }
    static confirm(config){
        avalon.vmodels['confirm'].openInit(config)
    }
    static openLoading() {
        // this.loadingCount++
        // if(this.loadingIndex!==-1) return
        // this.loadingIndex = layer.load(1, {
        //   shade: [0.1,'black'] //0.1透明度的白色背景
        // })
    }
    static closeLoading(){
        // this.loadingCount--
        // if(this.loadingCount===0){
        //   layer.close(this.loadingIndex)
        //   this.loadingIndex = -1
        // }
    }
}
