const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")

module.exports =class RoleService extends BaseService{
  constructor () {
    super('role')
  }
  /**
   * 新建
   * @param {name} password 角色名称
   */
   async save (ctx) {
    const roleName = ctx.request.body.roleName
    if (StringUtil.someNull([roleName])) {
      ctx.body = SystemUtil.createResult({success: false, message: '角色名不能为空'})
    }
    const roleInfo = await M['role'].findOne({where: {roleName}})
    const isExistsRole = roleInfo != null
    if (!isExistsRole) {
      const message = '新建角色' + roleName + '成功'
      const data = await M['role'].create({
        roleName
      })
      ctx.body = SystemUtil.createResult({success: true, message, data})
    } else {
      const message = '已存在' + roleName + '角色'
      ctx.body = SystemUtil.createResult({success: false, message})
    }
  }

  /*
   * 更新用户
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
   async update (ctx) {
    const roleName = ctx.request.body.roleName
    const id = ctx.params.id
    if (StringUtil.isNull(roleName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await M['role'].update({roleName}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }
  

}
