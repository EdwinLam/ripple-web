const App = getApp()
import GoodApi from '../../api/GoodApi'

Page({
  data: {
    indicatorDots: !0,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !0,
    prompt: {
      hidden: !0,
    },
    classifyItems: []
  },
  components: {
    searchBar: {},
    swiper:{}
  },
  onLoad() {
    this.banner = App.HttpResource('/banners/:id', {id: '@id'})
    this.getBanners()
    this.getClassify()
  },
  initData() {
    this.setData({
      goods: []
    })
  },
  navigateTo(e) {
    App.WxService.navigateTo('/pages/goods/detail/index', {
      id: e.currentTarget.dataset.id
    })
  },
  getBanners() {
    this.banner.queryAsync({isShow: 1})
      .then(res => {
        const items = res.data.rows[0].bannerImages
        this.childrens.swiper.setData({
          images: items
        })
      })
  },
  getClassify() {
    GoodApi.indexGoodShow(5).then((res)=>{
      this.setData({
        classifyItems: res.data
      })
    })
  },

  onPullDownRefresh() {
    console.info('onPullDownRefresh')
  },
  onReachBottom() {
    console.info('onReachBottom')
  },
  onTapTag(e) {
    const type = e.currentTarget.dataset.type
    const index = e.currentTarget.dataset.index
    this.getClassify()
  },
})
