const A = getApp()
Page({
    data: {
        current: 0,
        goodItem:{}
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
})