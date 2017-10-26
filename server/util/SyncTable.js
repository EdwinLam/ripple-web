const db = require('../models')
const userDao=db['user']
const classifyDao=db['classify']
const bannerDao=db['banner']
const goodDao=db['good']

const bannerImageDao=db['bannerImage']
console.log('》 数据库同步开始...')
db.sequelize.sync({force:true}).then(function(){
  const user={
    userName:'约翰史密斯',
    phone:'13824789780',
    password:'$10$HIH2Bx.hTKqxE38Vl1mIAeWm0MrgXImhFlYwrqogBMzrU1fdqlOte'
  }
  let classifies = [
    {classifyName:'蔬菜瓜果',path:'/url'},
    {classifyName:'家禽肉蛋',path:'/url'},
    {classifyName:'水产海鲜',path:'/url'},
    {classifyName:'冰冷食品',path:'/url'},
    {classifyName:'豆制食品',path:'/url'},
    {classifyName:'时令水果',path:'/url'},
  ]

  const banner={
    title:'测试',
    remark:'测试',
    sort:1,
    isShow:1,
    bannerImages: [
      { path: '../../assets/images/mcb/mc1.jpg',url:'http://www.baidu.com'},
      { path: '../../assets/images/mcb/mc2.jpg',url:'http://www.baidu.com'},
      { path: '../../assets/images/mcb/mc3.jpg',url:'http://www.baidu.com'},
      { path: '../../assets/images/mcb/mc4.jpg',url:'http://www.baidu.com'}
    ]
  }
  const goods =[
    {goodName:'苹果',price:20,classifyId:1},
    {goodName:'学历',price:20,classifyId:1},
    {goodName:'香蕉',price:20,classifyId:1}
  ]
  userDao.create(user).then(function(){
    bannerDao.create(banner ,{
      include: [bannerImageDao]
    }).then(function(){
      classifyDao.bulkCreate(classifies).then(function(){
        goodDao.bulkCreate(goods).then(function(){
          console.log('》数据库同步完成')
          process.exit()
        })
      })
    })
  })
})