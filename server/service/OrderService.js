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
    const goodItems = ctx.request.body.goodItems
    const address = ctx.request.body.address
    const totalAmount = goodItems.length
    let payAmount = 0
    goodItems.forEach(item=>payAmount+=item.totalPrice)
    const goodIds =  goodItems.map(item=>{return item.id})
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
    const orderGoods = goodItems.map(item=>{
      return {
        orderId:order.id,
        goodId:item.id,
        num:item.num,
        totalPrice:item.totalPrice
      }
    })
    await M['orderGoods'].bulkCreate(orderGoods)
    await M['cartGoods'].destroy({where: {cartId:cart.dataValues.id,goodId:{$in:goodIds}}})
    ctx.body = SystemUtil.createResult({success, message,data:order})
  }
}
