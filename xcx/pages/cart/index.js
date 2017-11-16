const A = getApp()

Page({
    data: {
        goodSales: [],
        prompt: {
            hidden: !0,
            icon: '../../assets/images/iconfont-cart-empty.png',
            title: '购物车空空如也',
            text: '来挑几件好货吧',
            buttons: [
                {
                    text: '随便逛',
                    bindtap: 'bindtap',
                },
            ]
        }
    },
    bindtap(e) {
        const index = e.currentTarget.dataset.index
        switch(index) {
            case 0:
                A.WxService.switchTab('/pages/index/index')
                break
            default:
                break
        }
    },
    onShow() {
        this.getCarts()
    },
    getCarts() {
      A.API['cart'].getUserCart()
        .then(res => {
          res.data.goodSales=res.data.goodSales?res.data.goodSales:[]
          res.data.goodSales.forEach(function(el){
              el.thumbUrl = A.renderImage(el.thumbUrl)
              el.isCanEdit = false
          })
          this.setData({
            goodSales: res.data.goodSales,
            'prompt.hidden': res.data.goodSales.length,
          })
        })
    },
    onPullDownRefresh() {
        this.getCarts()
    },
    navigateTo(e) {
        A.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    confirmOrder(e) {
        A.WxService.setStorageSync('confirmOrder', this.data.goodSales)
        A.WxService.navigateTo('/pages/order/confirm/index')
    },
    del(e) {
        const id = e.currentTarget.dataset.id
        A.WxService.showModal({
            title: '友情提示', 
            content: '确定要删除这个宝贝吗？', 
        })
        .then(data => {
            if (data.confirm == 1) {
                A.API['cart'].delCartGood(id)
                .then(res => {
                  this.getCarts()
                })
            }
        })
    },
    clear() {
        A.WxService.showModal({
            title: '友情提示', 
            content: '确定要清空购物车吗？', 
        }).then(data => {
            if (data.confirm == 1) {
                A.API['cart'].clearCart().then(res =>{
                  this.getCarts()
                })
            }
        })
    },
    onTapEdit(e) {
      const good = A.COM.getEl(e,this.data.goodSales)
      good.isCanEdit=!good.isCanEdit
      this.setData({
        goodSales: this.data.goodSales
      })
    },
    bindKeyInput(e) {
      var total = e.detail.value
      const good = A.COM.getEl(e,this.data.goodSales)
      if (total < 1 || total>100) return
      this.saveCartGood({goodId:good.id,goodNum:total,good})
    },
    decrease(e) {
      const goodSale = A.COM.getEl(e,this.data.goodSales)
      const goodNum =  goodSale.cartGoodSales.goodNum-1
      if (goodNum < 1) return
      this.saveCartGood({goodNum,goodSale})
    },
    increase(e) {
      const goodSale = A.COM.getEl(e,this.data.goodSales)
      const goodNum =  goodSale.cartGoodSales.goodNum+1
      if (goodNum > 100) return
      this.saveCartGood({goodNum,goodSale})
    },
    saveCartGood({goodNum,goodSale}){
      goodSale.cartGoodSales.goodNum = goodNum
      this.setData({
        goodSales: this.data.goodSales
      })
      const goodSaleId = goodSale.id
      A.API['cart'].setCartGood({goodSaleId,goodNum})
    }
})