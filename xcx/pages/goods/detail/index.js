const App = getApp()

Page({
    data: {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !1,
        interval: 3000,
        duration: 1000,
        current: 0,
        goodItem:{}
    },
    swiperchange(e) {
        this.setData({
            current: e.detail.current, 
        })
    },
    onLoad(option) {
        this.goods = App.HttpResource('/goods/:id', {id: '@id'})
        this.setData({
            id: option.id
        })
    },
    onShow() {
        this.getDetail(this.data.id)
    },
    addCart(e) {
        const goods = this.data.goods.item._id
        App.HttpService.addCartByUser(goods)
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                this.showToast(data.meta.message)
            }
        })
    },
    previewImage(e) {
        const urls = this.data.goodItem && this.data.goodItem.imageItems.map(n => n.path)
        const index = e.currentTarget.dataset.index
        const current = urls[Number(index)]
        
        App.WxService.previewImage({
            current: current, 
            urls: urls, 
        })
    },
    showToast(message) {
        App.WxService.showToast({
            title   : message, 
            icon    : 'success', 
            duration: 1500, 
        })
    },
    getDetail(id) {
        this.goods.getAsync({id: id})
        .then(res => {
            const data = res.data
            data.goodImages.forEach(n => n.path = App.renderImage(n.path))
          console.log(data)
        		this.setData({
              goodItem: data
            })
        	})
    },
})