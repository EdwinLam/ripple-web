const A = getApp()

Page({
    data: {
        hidden: !0,
        carts: {},
        address: {},
        addressId:-1
    },
    onLoad(option) {
        if(option.addressId){
          this.setData({
            addressId:option.addressId
          })
        }
      const carts = {
            items: A.WxService.getStorageSync('confirmOrder'), 
            totalAmount: 0, 
        }
        carts.items.forEach(n => carts.totalAmount+=n.price*n.cartGoodSales.goodNum)
        this.setData({
            carts: carts
        })
    },
    onShow() {
      const addressId = this.data.addressId
      if (addressId=== -1) {
          this.getDefalutAddress()
        }else{
          this.getAddressDetail(this.data.addressId)
        }
    },
  getAddressDetail(id) {
    A.RES['address'].queryAsync({id})
      .then(res => {
          this.setData({
             address : res.data
          })

      })
  },
    redirectTo(e) {
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
            if (data.confirm == 1) {
                A.WxService.redirectTo('/pages/address/add/index')
            } else {
                A.WxService.navigateBack()
            }
        })
    },
    addOrder() {
        const address = this.data.address
        const goodSaleItems =this.data.carts.items.map(item=>{
            return {
                id: item.id,
                totalPrice:item.price*item.cartGoodSales.goodNum,
                num:item.cartGoodSales.goodNum
            }
        })
        A.API['order'].saveOrder({address,goodSaleItems})
        .then(res => {
          A.WxService.redirectTo('/pages/order/detail/index', {
            id: res.data.id
          })
        })
    }
})