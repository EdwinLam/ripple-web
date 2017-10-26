const App = getApp()

Page({
  data: {
    activeIndex: 0,
    navList: [],
    indicatorDots: !0,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !0,
    goods: {},
    prompt: {
      hidden: !0,
    },
    classifyItems: []
  },
  swiperchange(e) {
    // console.log(e.detail.current)
  },
  onLoad() {
    this.banner = App.HttpResource('/banners/:id', {id: '@id'})
    this.goods = App.HttpResource('/goods/:id', {id: '@id'})
    this.classify = App.HttpResource('/classifies/:id', {id: '@id'})

    this.getBanners()
    this.getClassify()
  },
  initData() {
    const type = this.data.goods.params && this.data.goods.params.type || ''
    const goods = {
      items: [],
      params: {
        page: 1,
        limit: 10,
        type: type,
      },
      paginate: {}
    }

    this.setData({
      goods: goods
    })
  },
  navigateTo(e) {
    App.WxService.navigateTo('/pages/goods/detail/index', {
      id: e.currentTarget.dataset.id
    })
  },
  search() {
    App.WxService.navigateTo('/pages/search/index')
  },
  getBanners() {
    this.banner.queryAsync({isShow: 1})
      .then(res => {
        const items = res.data.rows[0].bannerImages
        this.setData({
          images: items
        })
      })
  },
  getClassify() {
    const activeIndex = this.data.activeIndex
    this.classify.queryAsync({
      pageNo: 1,
      pageSize: 6,
    })
      .then(res => {
        console.log( res.data.rows)
        this.setData({
          classifyItems: res.data.rows,
        })
        this.onPullDownRefresh()
      })
  },
  getList() {
    const goods = this.data.goods
    const params = goods.params

    // App.HttpService.getGoods(params)
    this.goods.queryAsync(params)
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
  onPullDownRefresh() {
    console.info('onPullDownRefresh')
    this.initData()
    this.getList()
  },
  onReachBottom() {
    console.info('onReachBottom')
    if (!this.data.goods.paginate.hasNext) return
    this.getList()
  },
  onTapTag(e) {
    const type = e.currentTarget.dataset.type
    const index = e.currentTarget.dataset.index
    const goods = {
      items: [],
      params: {
        page: 1,
        limit: 10,
        type: type,
      },
      paginate: {}
    }
    this.setData({
      activeIndex: index,
      goods: goods,
    })
    this.getList()
  },
})
