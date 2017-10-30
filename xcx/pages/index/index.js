const App = getApp()
import GoodApi from '../../api/GoodApi'

Page({
  data: {
    inputVal:'',
    indicatorDots: !0,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !0,
    prompt: {
      hidden: !0,
    },
    classifyItems: [],
    searchItems:[],
    sliderItems:[]
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
    console.log('ok')
    App.WxService.navigateTo('/pages/goods/detail/index', {
      id: e.currentTarget.dataset.id
    })
  },
  getBanners() {
    this.banner.queryAsync({isShow: 1})
      .then(res => {
        const items = res.data.rows[0].bannerImages
        this.setData({
          sliderItems: items
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

  /*搜索框部分*/
  inputTyping:function(e){
    this.setData({
      inputVal: e.detail.value
    })
    this.search()
  },
  search:function(){
    if (!this.data.inputVal) return
    GoodApi.queryByKeyWord(this.data.inputVal).then((res)=>{
      this.setData({
        searchItems: res.data
      })
      console.log(res)
    })
  },

  /*页面时间部分*/
  clearInput:()=>{
    this.inputVal=''
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
