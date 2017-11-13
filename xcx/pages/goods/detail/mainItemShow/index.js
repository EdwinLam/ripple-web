const A = getApp()

export default {
  data:{
  },
  method:{
    openAttrChoose(e){
      this.setData({
        showModalStatus:true
      })
    },
    openDetail(e){
      this.setData({
        showDetailModalStatus:true
      })
      console.log(this.data.showDetailModalStatus)
    }
  }
}