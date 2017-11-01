const App = getApp()

Page({
    data: {
        classifyItems: [],
        goodItems:[],
        goods: {},
        classify: {}
    },
    onLoad() {
        this.classify = App.HttpResource('/classifies/:id', {id: '@id'})
        this.goods = App.HttpResource('/goods/:id', {id: '@id'})
        this.getSystemInfo()
        this.onRefresh()
    },
    initData() {
        this.setData({
          classifyItems:[]
        })
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    getList() {
        this.classify.queryAsync()
        .then(res => {
          this.setData({
            classifyItems: res.data.rows,
          })
          this.getGoods(this.data.classifyItems[0].id)
        })
    },
    onRefresh() {
        this.initData()
        this.initGoods()
        this.getList()
    },
    getMore() {
        if (!this.data.classify.paginate.hasNext) return
        this.getList()
    },
    changeTab(e) {
        const dataset = e.currentTarget.dataset
        const index = dataset.index
        const id = dataset.id
        this.initGoods()
        this.setData({
            activeIndex: index, 
            'goods.params.type': id, 
        })

        this.getGoods()
    },
    initGoods() {

    },
    getGoods(classifyId) {
        const goods = this.data.goods
        const params = goods.params
        // App.HttpService.getGoods(params)
        this.goods.queryAsync({classifyId})
        .then(res => {
          this.setData({
            goodItems: res.data.rows
          })
        })
    },
    onRefreshGoods() {
        this.initGoods()
        this.getGoods()
    },
    getMoreGoods() {
        if (!this.data.goods.paginate.hasNext) return
        this.getGoods()
    },
    getSystemInfo() {
        App.WxService.getSystemInfo()
        .then(data => {
            console.log(data)
            this.setData({
                deviceWidth: data.windowWidth, 
                deviceHeight: data.windowHeight, 
            })
        })
    },
})