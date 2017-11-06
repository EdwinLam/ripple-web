const A = getApp()
Page({
  data: {
    inputVal:'',
    classifyItems: [],
    searchItems:[],
    sliderItems:[]
  },
  onLoad() {
    this.getBanners()
    this.getClassify()
  },
  initData() {
    this.setData({
      goods: []
    })
  },
  navigateTo(e) {
    console.log(e)
    A.WxService.navigateTo('/pages/goods/detail/index', {
      id: e.currentTarget.dataset.id
    })
  },
  getBanners() {
    A.RES['banner'].queryAsync({isShow: 1})
      .then(res => {
        const items = res.data.rows[0].bannerImages
        this.setData({
          sliderItems: items
        })
      })
  },
  getClassify() {
    A.API['good'].indexGoodShow(5).then((res)=>{
        this.setData({
          classifyItems: res.data
        })
    })
  },
  addCart (e) {
    const goodId = e.currentTarget.dataset.id
    A.API['cart'].addToCart({goodId}).then((res)=>{
      A.WxService.showToast({
        title   : '添加购物车成功！',
        icon    : 'success',
        duration: 1500,
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
    A.API['good'].queryByKeyWord(this.data.inputVal).then((res)=>{
      this.setData({
        searchItems: res.data
      })
    })
  },
  clearInput:function(){
    this.setData({
      inputVal: ''
    })
  },
  onPullDownRefresh() {
    this.getClassify()
  },
  onReachBottom() {
    console.info('onReachBottom')
  },
  classifyNavigateTo(e) {
    A.WxService.setStorageSync('classifyId',e.currentTarget.dataset.id)
    A.WxService.switchTab('/pages/classify/index')
  }
})
