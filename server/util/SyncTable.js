const db = require('../models')
const SystemUtil = require('./SystemUtil.js')
console.log('》 数据库同步开始...')
let createClassify = async (callback) => {
  const goods = [
    {
      goodName: '苹果',
      remark: '测试描述',
      price: 20,
      thumbUrl: '../../assets/images/mcb/good/1.jpg',
      goodImages: [{path: './images/mcb/good/1.jpg'}]
    },
    {
      goodName: '学历',
      remark: '测试描述',
      price: 20,
      thumbUrl: '../../assets/images/mcb/good/1.jpg',
      goodImages: [{path: './images/mcb/good/1.jpg'}]
    },
    {
      goodName: '香蕉',
      remark: '测试描述',
      price: 20,
      thumbUrl: '../../assets/images/mcb/good/1.jpg',
      goodImages: [{path: './images/mcb/good/1.jpg'}]
    }
  ]
  let data = {
    classifyName: '蔬菜瓜果',
    classifyImages: [
      {path: '../../assets/images/mcb/classify/1.jpg'},
      {path: '../../assets/images/mcb/classify/2.jpg'}],
    thumbUrl: '../../assets/images/mcb/classify/1.jpg',
    goods
  }
  const include = [db['classifyImage'], {model: db['good'], include: db['goodImage']}]
  const classifyArray =['蔬菜瓜果','家禽肉蛋','水产海鲜','冰冷食品','豆制食品','时令水果']
  classifyArray.forEach(async function (el) {
    data.classifyName = el
    await db['classify'].create(data, {include})
  })
}
let createBanner = async (callback) => {
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
  }).then(callback)
}

/*新建物品属性基础值*/
let createGoodAttrTemplate = async (user) => {
  const goodAttrs = [
    {name: "型号"},
    {name: "是否需要上门安装"}
  ]
  const goodAttrTemplate = {
    name:"测试分类",
    goodAttrs
  }
  const goodAttrTemplateM = await db['goodAttrTemplate'].create(goodAttrTemplate, {include:[db['goodAttr'],db['user']]})
  await goodAttrTemplateM.setUser(user)
}

let createUser = async (callback) => {
  const user = {
    userName: 'admin',
    phone: '13824789780',
    password: SystemUtil.enCodePassword("panda8968")
  }
  return await db['user'].create(user).then(callback)
}
db.sequelize.sync({force: true}).then(async function () {
  /*新建用户基础数据*/
  const user = await createUser()
  /*新建物品属性基础值*/
  await createGoodAttrTemplate(user)
  /*初始化幻灯片数据*/
  await createBanner()
  /*新建测试物品与分类*/
  await createClassify()
  console.log('》数据库同步完成')
  process.exit()
})