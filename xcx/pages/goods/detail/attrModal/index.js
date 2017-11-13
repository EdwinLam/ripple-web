const A = getApp()

export default {
  data:{
    showDetailModalStatus:false,
  },
  method:{
    //显示对话框
    showDetailModal: function () {
      // 显示遮罩层
      let animation = A.WxService.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        detailAnimationData: animation.export(),
        showDetailModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          detailAnimationData: animation.export()
        })
      }.bind(this), 200)
    },
    //隐藏对话框
    hideDetailModal: function () {
      // 隐藏遮罩层
      let animation =  A.WxService.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        detailAnimationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          detailAnimationData: animation.export(),
          showDetailModalStatus: false
        })
      }.bind(this), 200)
    }
  }
}