const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")

module.exports = class OrderService  extends BaseService{
  constructor () {
    super('order')
  }
  /**
   * 根据条件查询
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  async list (ctx) {
    let pageNo = parseInt(ctx.query.pageNo) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 10
    delete ctx.query.pageNo
    delete ctx.query.pageSize
    if(ctx.query.status==='all')
      delete ctx.query.status
    const include = [M['user'],{model:M['goodSale'],include:[M['goodAttrRecord'],M['good']]}]
    const orderItems = await SystemUtil.queryPage(M[this.key], ctx.query, pageNo, pageSize,include)
    ctx.body = await SystemUtil.queryPage(M[this.key], ctx.query, pageNo, pageSize,include)
  }



   async saveOrder(ctx){
    let success = true
    let message = '查询成功'
    const goodSaleItems = ctx.request.body.goodSaleItems
    const address = ctx.request.body.address
    const totalAmount = goodSaleItems.length
    let payAmount = 0
     goodSaleItems.forEach(item=>payAmount+=item.totalPrice)
    const goodSaleIds =  goodSaleItems.map(item=>{return item.id})
    const order = await M['order'].create({
      totalAmount,
      payAmount,
      recipientName:address.name,
      recipientGender:address.gender,
      recipientTel:address.tel,
      recipientAddress:address.address
    })
    const userId = 1
    const cart = await M['cart'].findOne({where:{userId}})
    const orderGoodSales = goodSaleItems.map(item=>{
      return {
        orderId:order.id,
        goodSaleId:item.id,
        num:item.num,
        totalPrice:item.totalPrice
      }
    })
    await M['orderGoodSales'].bulkCreate(orderGoodSales)
    await M['cartGoodSales'].destroy({where: {cartId:cart.dataValues.id,goodSaleId:{$in:goodSaleIds}}})
    ctx.body = SystemUtil.createResult({success, message,data:order})
  }
}
