const App = getApp()
import CartApi from '../../../api/CartApi'

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
    addCart (e) {
      const goodIds = [1,2,3]
      const userId = 1
      CartApi.addToCart({userId,goodIds}).then((res)=>{
        console.log(res)
        this.showToast('添加购物车成功！')
      })
    },
    previewImage(e) {
        const urls = this.data.goodItem && this.data.goodItem.goodImages.map(n => n.path)
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