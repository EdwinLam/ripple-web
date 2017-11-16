const A = getApp()

Page({
    data: {
        addressItems: [],
        address:{}
    },
    onLoad(option) {
      this.getAddressList()
    },
    radioChange(e) {
        const index =  e.detail.value
        A.WxService.redirectTo('/pages/order/confirm/index', {
          addressId: this.data.addressItems[index].id
        })
    },
    getAddressList() {
        A.RES['address'].queryAsync({userId:1})
        .then(res => {
          res.data.rows.forEach((item) => item.checked = item.id === this.data.address.id)
          this.setData({
              addressItems:res.data.rows
            })
        })
    },
    onPullDownRefresh() {
        this.getAddressList()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        this.getAddressList()
    },
})