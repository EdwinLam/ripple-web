const A = getApp()

Page({
    data: {
        goodItems: [],
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
    onLoad() {
    },
    onShow() {
        this.getCarts()
    },
    getCarts() {
      A.API['cart'].getUserCart()
        .then(res => {
          res.data.goods=res.data.goods?res.data.goods:[]
          res.data.goods.forEach(function(el){
              el.isCanEdit = false
          })
          console.log(res)
          this.setData({
            goodItems:  res.data.goods,
            'prompt.hidden': res.data.goods.length,
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
        A.WxService.setStorageSync('confirmOrder', this.data.goodItems)
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
                    console.log(data)
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
      const good = A.COM.getEl(e,this.data.goodItems)
      good.isCanEdit=!good.isCanEdit
      this.setData({
        goodItems: this.data.goodItems
      })
    },
    bindKeyInput(e) {
      var total = e.detail.value
      const good = A.COM.getEl(e,this.data.goodItems)
      if (total < 1 || total>100) return
      this.saveCartGood({goodId:good.id,goodNum:total,good})
    },
    decrease(e) {
      const good = A.COM.getEl(e,this.data.goodItems)
      const goodNum =  good.cartGoods.goodNum-1
      if (goodNum < 1) return
      this.saveCartGood({goodId:good.id,goodNum,good})
    },
    increase(e) {
      const good = A.COM.getEl(e,this.data.goodItems)
      const goodNum =  good.cartGoods.goodNum+1
      if (goodNum > 100) return
      this.saveCartGood({goodId:good.id,goodNum,good})
    },
    saveCartGood({goodId,goodNum,good}){
      good.cartGoods.goodNum = goodNum
      this.setData({
        goodItems: this.data.goodItems
      })
      A.API['cart'].setCartGood({goodId,goodNum})
    }
})