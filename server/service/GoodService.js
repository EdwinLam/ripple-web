const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require('./BaseService')
const _ = require('lodash')
module.exports = class GoodService extends BaseService{
  constructor () {
    super('good')
  }

  async get(ctx){
    let success = true
    let message = '查询成功'
    const id = ctx.params.id
    const data = await M['good'].findById(id,{
      include:[M['goodImage'],{model:M['goodAttr'],include:M['goodAttrRecord']}]
    })
    const goodSales = await M['goodSale'].findAll({
      where:{goodId:data.id},include:M['goodAttrRecord']
    })
    const maxPrice = _.maxBy(goodSales, function(o) { return o.price; }).price
    const minPrice = _.minBy(goodSales, function(o) { return o.price; }).price
    data.dataValues.maxPrice = maxPrice
    data.dataValues.minPrice = minPrice
    data.dataValues.goodSales = goodSales
    if(data){
      ctx.body = SystemUtil.createResult({success, message,data})
    }else{
      success = false
      message = '不存在id为'+id+'的数据'
      ctx.body = SystemUtil.createResult({success, message})
    }
  }

  /**
   * 模糊查询
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  async queryByKeyWord(ctx){
    const keyWord = ctx.query.keyWord || ''
    const res = await  M['good'].findAll({
      where: { goodName: { $like: '%'+keyWord+'%' } },
      include: [ M['classify']]
    })
    ctx.body = SystemUtil.createResult({success: true, message: '查询成功',data:res})
  }

  /**
   * 获取首页展示物品
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  async indexGoodShow(ctx){
    let size = parseInt(ctx.query.size) || 3
    const res = await M['classify'].findAll({
      include: [
      { model: M['good'],
        limit: size,
        order: [['id','desc']],
        include:[
          {model:M['goodImage']}
        ]
      },
      {model:M['classifyImage']},

    ]})
    ctx.body = SystemUtil.createResult({success: true, message: '查询成功',data:res})
  }
}
