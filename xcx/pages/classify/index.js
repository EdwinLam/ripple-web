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
          this.getGoods()
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
        const type = this.data.goods.params && this.data.goods.params.type || ''
        const goods = {
            items: [],
            params: {
                page : 1,
                limit: 10,
                type : type,
            },
            paginate: {}
        }
        this.setData({
            goods: goods
        })
    },
    getGoods(classifyId) {
        const goods = this.data.goods
        const params = goods.params
        // App.HttpService.getGoods(params)
        this.goods.queryAsync({where:{classifyId}})
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
                goods.items = [...goods.items, ...data.data.items]
                goods.paginate = data.data.paginate
                goods.params.page = data.data.paginate.next
                goods.params.limit = data.data.paginate.perPage
                this.setData({
                    goods: goods,
                    'prompt.hidden': goods.items.length,
                })
            }
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