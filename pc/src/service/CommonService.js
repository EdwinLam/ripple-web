export default class commonUtil {
    constructor() {
        this.loadingIndex = -1
        this.loadingCount = 0
    }
    static alert(config){
        avalon.vmodels['commonAlert'].openInit(config)
    }
    static confirm(config){
        avalon.vmodels['commonConfirm'].openInit(config)
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
