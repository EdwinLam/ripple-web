const db = require('../models')
const userDao = db['user']
const classifyDao = db['classify']
const bannerDao = db['banner']
const goodDao = db['good']
const bannerImageDao = db['bannerImage']
console.log('》 数据库同步开始...')
const createClassify = (callback) => {
  const goods = [
    {goodName: '苹果',remark:'测试描述', price: 20,thumbUrl:'../../assets/images/mcb/good/1.jpg', goodImages: [{path: './images/mcb/good/1.jpg'}]},
    {goodName: '学历',remark:'测试描述', price: 20,thumbUrl:'../../assets/images/mcb/good/1.jpg', goodImages: [{path: './images/mcb/good/1.jpg'}]},
    {goodName: '香蕉',remark:'测试描述', price: 20,thumbUrl:'../../assets/images/mcb/good/1.jpg', goodImages: [{path: './images/mcb/good/1.jpg'}]}
  ]
  let data = {
    classifyName: '蔬菜瓜果',
    classifyImages: [
      {path: '../../assets/images/mcb/classify/1.jpg'},
      {path: '../../assets/images/mcb/classify/2.jpg'}],
    thumbUrl:'../../assets/images/mcb/classify/1.jpg',
    goods
  }
  const include = [db['classifyImage'], {model: db['good'], include: db['goodImage']}]
  db['classify'].create(data, {include}).then(function () {
    data.classifyName = '家禽肉蛋'
    db['classify'].create(data, {include}).then(function () {
      data.classifyName = '水产海鲜'
      db['classify'].create(data, {include}).then(function () {
        data.classifyName = '冰冷食品'
        db['classify'].create(data, {include}).then(function () {
          data.classifyName = '豆制食品'
          db['classify'].create(data, {include}).then(function () {
            data.classifyName = '时令水果'
            db['classify'].create(data, {include}).then(callback)
          })
        })
      })
    })
  })
}
const createBanner = (callback) => {
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
  bannerDao.create(banner, {
    include: [bannerImageDao]
  }).then(callback)
}
const createUser = (callback) => {
  const user = {
    userName: '约翰史密斯',
    phone: '13824789780',
    password: '$10$Yj7qT6PkmhDevm2dRlfNGugfYWQKfk3bsTQz7ytO8Ics5Ss37XpIy'
  }
  userDao.create(user).then(callback)

}
db.sequelize.sync({force: true}).then(function () {
  createUser(function () {
    createBanner(function () {
      createClassify(function () {
        console.log('》数据库同步完成')
        process.exit()
      })
    })
  })
})