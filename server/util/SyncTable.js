const db = require('../models')
const SystemUtil = require('./SystemUtil.js')
const _ = require('lodash')
console.log('》 数据库同步开始...')
let createClassify = async () => {
  let classifyMap = {}
  let data = {
    classifyName: '蔬菜瓜果',
    classifyImages: [
      {path: '../../assets/images/mcb/classify/1.jpg'},
      {path: '../../assets/images/mcb/classify/2.jpg'}],
    thumbUrl: '../../assets/images/mcb/classify/1.jpg'
  }
  const include = [db['classifyImage']]
  const classifyArray = ['日用五金', '五金工具', '电子电工', '五金机电', '五金零部件', '其他五金']
  for (let i = 0; i < classifyArray.length; i++) {
    data.classifyName = classifyArray[i]
    const obj = await db['classify'].create(data, {include})
    classifyMap[classifyArray[i]] = obj
  }
  return classifyMap
}
let createGood =async(classifyMap,goodAttrTemplate)=>{
  const goods = [
    {
      goodName: '双杆毛巾杆',
      remark: '测试描述',
      price: 20,
      thumbUrl: './images/wj/1.jpg'
    },
    {
      goodName: '不锈钢卫生间毛巾架',
      remark: '测试描述',
      price: 20,
      thumbUrl: './images/wj/4.jpg'
    },
    {
      goodName: '家用多功能升降梯工程楼梯',
      remark: '测试描述',
      price: 20,
      thumbUrl: './images/wj/7.jpg'
    }
  ]
  const goodAttrRecords = goodAttrTemplate.goodAttrs.map(function(el){
    return el.goodAttrRecords
  })
  const goodAttrRecordGroups = SystemUtil.getCp(goodAttrRecords)
  const goodImageData = [{path: './images/wj/7.jpg'},{path: './images/wj/8.jpg'},{path: './images/wj/9.jpg'}]

  for(let key in classifyMap){
    const goodItems = await db['good'].bulkCreate(goods)
    for(let i=0; i<goodItems.length;i++){
      let goodSales = []
      goodAttrRecordGroups.forEach(async function (el) {
        const goodSaleData = {
          inventory: _.random(1, 100),
          price: _.random(1, 100),
          thumbUrl:'./images/wj/7.jpg'
        }
        const goodSale = await db['goodSale'].create(goodSaleData,{include:db['goodAttrRecord']})
        await goodSale.setGoodAttrRecords(el)
        await goodSale.setGood(goodItems[i])
        goodSales.push(goodSale)
      })
      const goodImages = await db['goodImage'].bulkCreate(goodImageData)
      await goodItems[i].setClassify(classifyMap[key])
      await goodItems[i].setGoodAttrs(goodAttrTemplate.goodAttrs)
      await goodItems[i].setGoodImages(goodImages)
    }
  }

}
let createBanner = async () => {
  const banner = {
    title: '测试',
    remark: '测试',
    sort: 1,
    isShow: 1,
    bannerImages: [
      {path: '../../assets/images/mcb/mc1.jpg', url: '/pages/goods/detail/index?id=1'},
      {path: '../../assets/images/mcb/mc1.jpg', url: '/pages/goods/detail/index?id=1'},
      {path: '../../assets/images/mcb/mc1.jpg', url: '/pages/goods/detail/index?id=1'},
      {path: '../../assets/images/mcb/mc1.jpg', url: '/pages/goods/detail/index?id=1'}
    ]
  }

  await db['banner'].create(banner, {
    include: db['bannerImage']
  })
}

/*新建物品属性模板*/
let createGoodAttrTemplate = async (user) => {
  const goodAttrTemplateData = {
    name:"测试属性模板",
    goodAttrs:[
      {name: "尺寸",goodAttrRecords:[
        {val:"小型",isSale:true},
        {val:"中型",isSale:true},
      ]},

      {name: "是否需要上门安装",goodAttrRecords:[
        {val:"是",isSale:true},
        {val:"否",isSale:true}
      ]}
      ]
  }
  const goodAttrTemplate = await db['goodAttrTemplate'].create(goodAttrTemplateData, {include:[{model:db['goodAttr'],include:db['goodAttrRecord']}]})
  await goodAttrTemplate.setUser(user)
  return goodAttrTemplate
}

let createUser = async () => {
  const user = {
    userName: 'admin',
    phone: '13824789780',
    password: SystemUtil.enCodePassword("panda8968")
  }
  return await db['user'].create(user)
}
db.sequelize.sync({force: true}).then(async function () {
  /*新建用户基础数据*/
  const user = await createUser()
  /*初始化物品属性模板*/
  const goodAttrTemplate = await createGoodAttrTemplate(user)
  /*初始化幻灯片数据*/
  await createBanner()
  /*新建物品分类*/
  const classifyMap = await createClassify()
  /*初始化商品*/
  await createGood(classifyMap,goodAttrTemplate)
  console.log('》数据库同步完成')
  process.exit()
})