const App = getApp()
import CartApi from '../../api/CartApi'

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
                App.WxService.switchTab('/pages/index/index')
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
      CartApi.getUserCart()
        .then(res => {
          res.data.goods.forEach(function(el){
              el.isCanEdit = false
          })
          this.setData({
            goodItems:  res.data.goods
          })
        })
    },
    onPullDownRefresh() {
        this.getCarts()
    },
    navigateTo(e) {
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    confirmOrder(e) {
        App.WxService.setStorageSync('confirmOrder', this.data.carts.items)
        App.WxService.navigateTo('/pages/order/confirm/index')
    },
    del(e) {
        const id = e.currentTarget.dataset.id
        App.WxService.showModal({
            title: '友情提示', 
            content: '确定要删除这个宝贝吗？', 
        })
        .then(data => {
            if (data.confirm == 1) {
                App.HttpService.delCartByUser(id)
                .then(res => {
                    const data = res.data
                    console.log(data)
                    if (data.meta.code == 0) {
                        this.getCarts()
                    }
                })
            }
        })
    },
    clear() {
        App.WxService.showModal({
            title: '友情提示', 
            content: '确定要清空购物车吗？', 
        })
        .then(data => {
            if (data.confirm == 1) {
                App.HttpService.clearCartByUser()
                .then(res => {
                    const data = res.data
                    console.log(data)
                    if (data.meta.code == 0) {
                        this.getCarts()
                    }
                })
            }
        })
    },
    onTapEdit(e) {
      const index = e.currentTarget.dataset.index
      const good = this.data.goodItems[index]
      good.isCanEdit=!good.isCanEdit
      this.setData({
        goodItems: this.data.goodItems
      })
    },
    bindKeyInput(e) {
          const index = e.currentTarget.dataset.index
          const good = this.data.goodItems[index]
          const CartGoods =good.CartGoods
      const goodId = good.id

      const id = e.currentTarget.dataset.id
        const total = Math.abs(CartGoods.goodNum)
        if (total < 0 || total > 100) return
          CartApi.setCartGood({good,goodNum:total}).then(()=>{
            CartGoods.goodNum=total
            this.setData({
              goodItems: this.data.goodItems
            })
          })
    },
    decrease(e) {
        const index = e.currentTarget.dataset.index
        const good = this.data.goodItems[index]
        const CartGoods =good.CartGoods
        const goodId = good.id
        if (CartGoods.goodNum === 1) return
        CartGoods.goodNum =  CartGoods.goodNum-1
        CartApi.setCartGood({goodId,goodNum:CartGoods.goodNum}).then(()=>{
          this.setData({
            goodItems: this.data.goodItems
          })
        })
    },
    increase(e) {
      const index = e.currentTarget.dataset.index
      const good = this.data.goodItems[index]
      const CartGoods =good.CartGoods
      const goodId = good.id
      if (CartGoods.goodNum === 100) return
      CartGoods.goodNum =  CartGoods.goodNum+1
      CartApi.setCartGood({goodId,goodNum:CartGoods.goodNum}).then(()=>{
        this.setData({
          goodItems: this.data.goodItems
        })
      })
    },
})