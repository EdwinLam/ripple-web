const A = getApp()
Page({
  data: {
    inputVal:'',
    prompt: {
      hidden: !0,
    },
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
