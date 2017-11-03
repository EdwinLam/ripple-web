const db = require('../models')
const orderDao = db['order']
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class OrderService {
  static async saveOrder(ctx){
    let success = true
    let message = '查询成功'
    const goodItems = ctx.request.body.goodItems
    const address = ctx.request.body.address
    const totalAmount = goodItems.length
    let payAmount = 0
    goodItems.forEach(item=>payAmount+=item.totalPrice)
    const goodIds =  goodItems.map(item=>{return item.id})
    const order = await db['order'].create({
      totalAmount,
      payAmount,
      recipientName:address.name,
      recipientGender:address.gender,
      recipientTel:address.tel,
      recipientAddress:address.address
    })
    const userId = 1
    const cart = await db['cart'].findOne({where:{userId}})
    const orderGoods = goodItems.map(item=>{
      return {
        orderId:order.id,
        goodId:item.id,
        num:item.num,
        totalPrice:item.totalPrice
      }
    })
    await db['orderGoods'].bulkCreate(orderGoods)
    await db['cartGoods'].destroy({where: {cartId:cart.dataValues.id,goodId:{$in:goodIds}}})
    ctx.body = SystemUtil.createResult({success, message,data:order})
  }
  static async setDefaultAddress(ctx){
    let success = true
    let message = '查询成功'
    const userId =1
    const id = ctx.request.body.id
    await db['order'].update({isDef:0}, {where: {userId}})
    await db['order'].update({isDef:1}, {where: {id}})
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
    ctx.body = await SystemUtil.queryPage(orderDao, ctx.query, pageNo, pageSize)
  }

  static async get (ctx) {
    let success = true
    let message = '查询成功'
    const id = ctx.params.id
    const data =await orderDao.findById(id)
    if (data) {
      ctx.body = SystemUtil.createResult({success, message, data})
    } else {
      success = false
      message = '不存在id为' + id + '的数据'
      ctx.body = SystemUtil.createResult({success, message})
    }
  }

  /**
   * 新建
   * @param {String} pCode 父分组Code 根目录为0
   * @param {String} pName 父分组名称
   * @param {name} password 角色名称
   */
  static async save (ctx) {
    let success = true
    let message = '新建成功'
    ctx.request.body.userId = 1
    const data = await orderDao.create(ctx.request.body)
    ctx.body = SystemUtil.createResult({success, message, data})
  }

  /*
   * 更新分组
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  static async update (ctx) {
    const nodeName = ctx.request.body.nodeName
    const id = ctx.params.id
    if (StringUtil.isNull(name)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await orderDao.update({where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  static async delete (ctx) {
    const count = await orderDao.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }
}
