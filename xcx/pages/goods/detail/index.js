const A = getApp()
import attrChooseModal from './attrChooseModal/index'
import mainItemShow from './mainItemShow/index'
import attrModal from './attrModal/index'

Page({
    data: {
        ...attrChooseModal.data,
        ...mainItemShow.data,
        ...attrModal.data,
        current: 0,
        goodItem:{},
        showPrice:0,
    },
    ...mainItemShow.method,
    ...attrChooseModal.method,
    ...attrModal.method,
    swiperchange(e) {
      this.setData({
            current: e.detail.current, 
       })
    },
    confirmOrder(e) {
      if(!this.data.goodSale.id){
        this.showModal('请选择属性')
        return
      }
      this.data.goodSale.goodNum = this.data.goodNum
      A.WxService.setStorageSync('confirmOrder', [this.data.goodSale])
      A.WxService.navigateTo('/pages/order/confirm/index')
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
      if(!this.data.goodSale.id){
        this.showModal('请选择属性')
        return
      }
      const goodSaleId = this.data.goodSale.id
      A.API['cart'].addToCart({goodSaleId}).then((res)=>{
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
            icon    : 'error',
            duration: 1500, 
        })
    },
  showModal:function(msg){
    A.WxService.showModal({
      content: msg,
      showCancel: false
    });
  },
    getDetail(id) {
        A.RES['good'].getAsync({id: id})
        .then(res => {
            const data = res.data
            data.goodImages.forEach(n => n.path = A.renderImage(n.path))
            const showPrice = data.minPrice===data.maxPrice?data.maxPrice:(data.minPrice+"~"+data.maxPrice)
        		this.setData({
              goodItem: data,
              showPrice,
              showImage: A.renderImage(data.thumbUrl),
              showInventory:data.totalInventory
            })
        	})
    }
})