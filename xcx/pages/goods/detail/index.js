const A = getApp()
Page({
    data: {
        current: 0,
        goodItem:{},
        showModalStatus:true
    },
    chooseSpec(e){
      A.WxService.redirectTo('/pages/goods/spec/index')
    },
    swiperchange(e) {
      this.setData({
            current: e.detail.current, 
       })
    },
    onLoad(option) {
        this.setData({
            id: option.id
        })
    },
    onShow() {
        this.getDetail(this.data.id)
    },

    addCart (e) {
      const goodId = this.data.id
      A.API['cart'].addToCart({goodId}).then((res)=>{
        console.log(res)
        this.showToast('添加购物车成功！')
      })
    },
    previewImage(e) {
        const urls = this.data.goodItem && this.data.goodItem.goodImages.map(n => n.path)
        const index = e.currentTarget.dataset.index
        const current = urls[Number(index)]
        A.WxService.previewImage({
            current: current, 
            urls: urls, 
        })
    },
    showToast(message) {
        A.WxService.showToast({
            title   : message, 
            icon    : 'success', 
            duration: 1500, 
        })
    },
    getDetail(id) {
        A.RES['good'].getAsync({id: id})
        .then(res => {
            const data = res.data
            data.goodImages.forEach(n => n.path = A.renderImage(n.path))
        		this.setData({
              goodItem: data
            })
        	})
    },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = A.WxService.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation =  A.WxService.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})