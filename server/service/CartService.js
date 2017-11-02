const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const _ = require('lodash');

module.exports = class CartService {
  /**
   * 根据条件查询
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  static async getUserCart (ctx) {
    let success = true
    let message = '查询成功'
    const userId = 1
    const data = await M['cart'].findOne({where:{userId},include: [
      M['user'],M['good']
    ]})
    ctx.body = SystemUtil.createResult({success, message,data})
  }

  static async getCart(){
    const userId = 1
    const data = await M['cart'].findOrCreate({where:{userId},defaults:{userId}})
    return data
  }

  static async clearCart (ctx) {
    let success = true
    let message = '清空成功'
    const cart = await this.getCart()
    await M['cartGoods'].destroy({where: {cartId:cart[0].dataValues.id}})
    ctx.body = SystemUtil.createResult({success, message})
  }

  static async delCartGood(ctx){
    const userId = 1
    const goodId = ctx.request.body.goodId
    let success = true
    let message = '删除成功'
    await M['cartGoods'].destroy({where: {goodId,userId}})
    ctx.body = SystemUtil.createResult({success, message})
  }

  static async setCartGood(ctx){
    const goodNum = ctx.request.body.goodNum
    const goodId = ctx.request.body.goodId
    const cart = await this.getCart()
    const cartId = cart[0].dataValues.id
    let success = true
    let message = '修改成功'
    await M['cartGoods'].update({goodNum}, {where: {cartId,goodId}})
    ctx.body = SystemUtil.createResult({success, message})
  }

  static async addToCart(ctx){
    let success = true
    let message = '添加成功'
    let goodId = 1
    const cart = await this.getCart()
    const cartId = cart[0].dataValues.id
    const cartGoods =await M['cartGoods'].findOrCreate({where: {goodId,cartId},defaults:{goodId,cartId,goodNum:0}})
    const goodNum =cartGoods[0].dataValues.goodNum+1
    await M['cartGoods'].update({goodNum}, {where: {cartId,goodId}})
    ctx.body = SystemUtil.createResult({success, message})
  }

  /**
   * 根据条件查询
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  static async list (ctx) {
    let pageNo = parseInt(ctx.query.pageNo) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 10
    delete ctx.query.pageNo
    delete ctx.query.pageSize
    const include= [
      M['user'],M['good']
    ]
    ctx.body =await SystemUtil.queryPage(M['cart'],ctx.query,pageNo,pageSize,include)
  }

  static async get(ctx){
    let success = true
    let message = '查询成功'
    const id = ctx.params.id
    const data = await M['cart'].findById(id,{
      include:[ M['user'],M['good']]
    })
    if(data){
      ctx.body = SystemUtil.createResult({success,message,data})
    }else{
      success = false
      message = '不存在id为'+id+'的数据'
      ctx.body = SystemUtil.createResult({success, message})
    }
  }

  /**
   * 新建
   */
  static async save (ctx) {
    let success = true
    let message = '新建成功'
    const data = await M['cart'].create(ctx.request.body)
    ctx.body = SystemUtil.createResult({success,message,data})
  }

  /*
   * 更新分组
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  static async update (ctx) {
    const nodeName = ctx.request.body.nodeName
    const id = ctx.params.id
    if (StringUtil.isNull(name))
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    await M['cart'].update({where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  static async delete (ctx) {
    const count = await M['cart'].destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }
}