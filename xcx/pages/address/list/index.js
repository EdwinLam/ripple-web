const A = getApp()

Page({
    data: {
        addressItems:[],
        prompt: {
            hidden: !0,
            icon: '../../../assets/images/iconfont-addr-empty.png',
            title: '还没有收货地址呢',
            text: '暂时没有相关数据',
        },
    },
    onLoad() {
        this.onPullDownRefresh()
    },
    toAddressEdit(e) {
        console.log(e)
        A.WxService.navigateTo('/pages/address/edit/index', {
            id: e.currentTarget.dataset.id
        })
    },
    toAddressAdd(e) {
        console.log(e)
        A.WxService.navigateTo('/pages/address/add/index')
    },
  setDefaultAddress(e) {
        const id = e.currentTarget.dataset.id
    console.log(id)
        A.API['address'].setDefaultAddress({id})
        .then(res => {
            this.getAddressItems()
        })
    },
    getAddressItems() {
       A.RES['address'].queryAsync()
        .then(res => {
          this.setData({
            addressItems: res.data.rows,
            'prompt.hidden': res.data.rows.length,
          })
        })
    },
    onPullDownRefresh() {
        console.info('onPullDownRefresh')
        this.getAddressItems()
    },
    onReachBottom() {
        console.info('onReachBottom')
        this.getAddressItems()
    },
})