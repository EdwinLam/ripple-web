const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")
const _ = require('lodash');
module.exports = class CartService extends BaseService {
  constructor () {
    super('cart')
  }
  /**
   * 根据条件查询
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  async getUserCart (ctx) {
    let success = true
    let message = '查询成功'
    const userId = 1
    const data = await M['cart'].findOne({where:{userId},include: [
      M['user'],{model:M['goodSale'],include:[{model:M['goodAttrRecord'],include:M['goodAttr']},M['good']]}
    ]})
    ctx.body = SystemUtil.createResult({success, message,data})
  }

  async getCart(){
    const userId = 1
    const data = await M['cart'].findOrCreate({where:{userId},defaults:{userId}})
    return data
  }

  async clearCart (ctx) {
    let success = true
    let message = '清空成功'
    const cart = await this.getCart()
    await M['cartGoodSales'].destroy({where: {cartId:cart[0].dataValues.id}})
    ctx.body = SystemUtil.createResult({success, message})
  }

  async delCartGood(ctx){
    const userId = 1
    const goodSaleId = ctx.request.body.goodSaleId
    let success = true
    let message = '删除成功'
    await M['cartGoodSales'].destroy({where: {goodSaleId,userId}})
    ctx.body = SystemUtil.createResult({success, message})
  }

  async setCartGood(ctx){
    const goodNum = ctx.request.body.goodNum
    const goodSaleId = ctx.request.body.goodSaleId
    const cart = await this.getCart()
    const cartId = cart[0].dataValues.id
    let success = true
    let message = '修改成功'
    await M['cartGoodSales'].update({goodNum}, {where: {cartId,goodSaleId}})
    ctx.body = SystemUtil.createResult({success, message})
  }

  async addToCart(ctx){
    let success = true
    let message = '添加成功'
    let goodSaleId =  ctx.request.body.goodSaleId
    const cart = await this.getCart()
    const cartId = cart[0].dataValues.id
    const cartGoods =await M['cartGoodSales'].findOrCreate({where: {goodSaleId,cartId},defaults:{goodSaleId,cartId,goodNum:0}})
    const goodNum =cartGoods[0].dataValues.goodNum+1
    await M['cartGoodSales'].update({goodNum}, {where: {cartId,goodSaleId}})
    ctx.body = SystemUtil.createResult({success, message})
  }
}