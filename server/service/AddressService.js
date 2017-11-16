const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")

module.exports = class AddressService extends BaseService {
  constructor () {
    super('address')
  }

  async setDefaultAddress (ctx) {
    let success = true
    let message = '查询成功'
    const userId = 1
    const id = ctx.request.body.id
    await M['address'].update({isDef: 0}, {where: {userId}})
    await M['address'].update({isDef: 1}, {where: {id}})
    ctx.body = SystemUtil.createResult({success, message})
  }

  /*
   * 更新
   */
  async update (ctx) {
    const id = ctx.params.id
    const userId = 1
    if(ctx.request.body.isDef)
      await M['address'].update({isDef: 0}, {where: {userId}})
    await M[this.key].update(ctx.request.body,{where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /**
   * 新建
   * @param {String} pCode 父分组Code 根目录为0
   * @param {String} pName 父分组名称
   * @param {name} password 角色名称
   */
  async save (ctx) {
    let success = true
    let message = '新建成功'
    ctx.request.body.userId = 1
    const userId = 1
    if(ctx.request.body.isDef === 1)
      await M['address'].update({isDef: 0}, {where: {userId}})
    const data = await M[this.key].create(ctx.request.body)
    ctx.body = SystemUtil.createResult({success, message, data})
  }

  async getDefaultAddress (ctx) {
    let success = true
    let message = '查询成功'
    const userId = 1
    const id = ctx.request.body.id
    const data = await M['address'].findOne({where: {userId, isDef: 1}})
    ctx.body = SystemUtil.createResult({success, message,data})
  }
}
