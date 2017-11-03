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

  async getDefaultAddress (ctx) {
    let success = true
    let message = '查询成功'
    const userId = 1
    const id = ctx.request.body.id
    const data = await M['address'].findOne({where: {userId, isDef: 1}})
    ctx.body = SystemUtil.createResult({success, message})
  }
}
