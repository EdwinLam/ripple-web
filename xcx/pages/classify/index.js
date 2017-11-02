const A = getApp()

Page({
    data: {
        classifyItems: [],
        goodItems:[],
        goods: {},
        classify: {}
    },
    onLoad() {
        this.getSystemInfo()
        this.onRefresh()
    },

    navigateTo(e) {
        A.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    getClassifyItems() {
       A.RES['classify'].queryAsync()
        .then(res => {
          this.setData({
            classifyItems: res.data.rows,
            classify:res.data.rows[0]
          })
          this.getGoodItems()
        })
    },
    onRefresh() {
        this.getClassifyItems()
    },
    getMore() {
        this.getClassifyItems()
    },
    changeTab(e) {
        const index = e.currentTarget.dataset.index
        const classify = this.data.classifyItems[index]
        this.setData({
          classify:classify
        })
        this.getGoodItems()
    },
    getGoodItems() {
        const goods = this.data.goods
        const params = goods.params
        // A.HttpService.getGoods(params)
        A.RES['good'].queryAsync({classifyId:this.data.classify.id})
        .then(res => {
          console.log(res)
          this.setData({
            goodItems: res.data.rows
          })
        })
    },
    onRefreshGoods() {
        this.getGoodItems()
    },
    getMoreGoods() {
        this.getGoodItems()
    },
    getSystemInfo() {
        A.WxService.getSystemInfo()
        .then(data => {
            this.setData({
                deviceWidth: data.windowWidth, 
                deviceHeight: data.windowHeight, 
            })
        })
    },
})