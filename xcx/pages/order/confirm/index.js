const A = getApp()

Page({
    data: {
        hidden: !0,
        carts: {},
        address: {}
    },
    onLoad(option) {
        option.address=option.address? JSON.parse(option.address):{}
        this.setData({
          address:option.address
        })
        const carts = {
            items: A.WxService.getStorageSync('confirmOrder'), 
            totalAmount: 0, 
        }
        console.log(carts)

        carts.items.forEach(n => carts.totalAmount+=n.price*n.cartGoods.goodNum)

        this.setData({
            carts: carts
        })
    },
    onShow() {
        const address = this.data.address
        console.log(address)
        if (!address.id) {
          this.getDefalutAddress()
        }
    },
    redirectTo(e) {
        console.log(e)
        A.WxService.redirectTo('/pages/address/confirm/index', {
          address: this.data.address
        })
    },
    getDefalutAddress() {
        A.API['address'].getDefaultAddress()
        .then(res => {
          this.setData({
            address: res.data
          })
        })
    },
    showModal() {
        A.WxService.showModal({
            title: '友情提示', 
            content: '没有收货地址，请先设置', 
        })
        .then(data => {
            console.log(data)
            if (data.confirm == 1) {
                A.WxService.redirectTo('/pages/address/add/index')
            } else {
                A.WxService.navigateBack()
            }
        })
    },
    addOrder() {
        const address = this.data.address
        const goodItems =this.data.carts.items.map(item=>{
            return {
                id: item.id,
                totalPrice:item.price*item.cartGoods.goodNum,
                num:item.cartGoods.goodNum
            }
        })
        A.API['order'].saveOrder({address,goodItems})
        .then(res => {
          A.WxService.redirectTo('/pages/order/detail/index', {
            id: res.data.id
          })
        })
    }
})