const A = getApp()

Page({
    data: {
        order:{}
    },
    onLoad(option) {
        console.log(option)
        this.setData({
            id: option.id
        })
    },
    onShow() {
        this.getOrderDetail(this.data.id)
    },
    getOrderDetail(id) {
        // A.HttpService.getOrderDetail(id)
        A.RES['order'].getAsync({id: id})
        .then(res => {
          this.setData({
            order: res.data
          })
        })
    },
})