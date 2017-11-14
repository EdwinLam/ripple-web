const A = getApp()

export default {
  data:{
    showModalStatus:false,
    selectedItemAttrRecord:[],
    goodSale:{},
    showImage:"",
    selectedName:'',
    goodNum:1,
    showInventory:0,
  },
  method:{
    /*选择属性*/
    chooseAttr:function(e){
      const gindex = e.currentTarget.dataset.gindex
      const id = e.currentTarget.dataset.id
      const thumbUrl = A.renderImage(e.currentTarget.dataset.url)
      let isSelected = false
      const goodItem = this.data.goodItem
      this.data.goodItem.goodAttrs[gindex].goodAttrRecords.forEach(function(el){
        if(el.selected && el.id==id)isSelected=true
        el.selected =!el.selected && el.id==id
      })
      var tmpArray=this.data.selectedItemAttrRecord.filter((el)=>{
        const values = el.split("_")
        return values[0]!=this.data.goodItem.goodAttrs[gindex].id
      })
      if(!isSelected) {
        tmpArray.push(this.data.goodItem.goodAttrs[gindex].id + "_" + id)
      }
      this.setData({
        goodItem:this.data.goodItem,
        selectedItemAttrRecord:tmpArray,
        selectedName:this.getSelectedName()
      })
      this.getSaleInfo()
    },
    bindKeyInput(e) {
      var goodNum = e.detail.value
      if (goodNum < 1 || goodNum>100) return
      this.setData({
        goodNum
      })
    },
    decrease(e) {
      const goodNum =  this.data.goodNum-1
      if (goodNum < 1) return
      this.setData({
        goodNum
      })
    },
    increase(e) {
      const goodNum =  this.data.goodNum+1
      if (goodNum > 100) return
      this.setData({
        goodNum
      })
    },
    getSelectedName:function(){
      let selectedName =[]
      this.data.goodItem.goodAttrs.forEach(function(goodAttr){
        goodAttr.goodAttrRecords.forEach(function(goodAttrRecord){
          if(goodAttrRecord.selected){
            selectedName.push(goodAttrRecord.val)
          }
        })
      })
      return selectedName.join("/")
    },
    getSaleInfo:function(){
      let isBreak = false
      this.data.goodItem.goodSales.forEach((el)=>{
        if(isBreak) return
        const goodAttrRecordArray = el.goodAttrRecords.map((el)=>el.id)
        const selectedId = this.data.selectedItemAttrRecord.map((el=>parseInt(el.split("_")[1])))
        const isSelected = goodAttrRecordArray.every((item)=>{
          return selectedId.indexOf(item)!==-1
        })
        if(isSelected){
          isBreak = true
          this.setData({
            goodSale:el,
            showImage:A.renderImage(el.thumbUrl),
            showPrice:el.price,
            showInventory:el.inventory
          })
        }else{
          const goodItem = this.data.goodItem
          this.setData({
            showImage:A.renderImage(goodItem.thumbUrl),
            showPrice:goodItem.minPrice===goodItem.maxPrice?goodItem.maxPrice:(goodItem.minPrice+'~'+goodItem.maxPrice),
            showInventory:goodItem.totalInventory
          })
        }
      })
    },
    //显示对话框
    showModal: function () {
      // 显示遮罩层
      let animation = A.WxService.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    },
    //隐藏对话框
    hideModal: function () {
      // 隐藏遮罩层
      let animation =  A.WxService.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 200)
    }
  }
}