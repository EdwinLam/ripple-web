const A = getApp()

Page({
    data: {
        addressItems: [],
        address:{}
    },
    onLoad(option) {
      this.setData({
        address:JSON.parse(option.address)
      })
      this.onPullDownRefresh()
    },
    radioChange(e) {
        const index =  e.detail.value
        A.WxService.redirectTo('/pages/order/confirm/index', {
          address: this.data.addressItems[index]
        })
    },
    getAddressList() {
        A.RES['address'].queryAsync({userId:1})
        .then(res => {
          res.data.rows.forEach((item) => item.checked = item.id === this.data.address.id)
          console.log(res.data.rows)
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