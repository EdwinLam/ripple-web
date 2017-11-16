const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")

module.exports = class OrderService  extends BaseService{
  constructor () {
    super('order')
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
