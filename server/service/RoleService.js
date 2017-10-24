const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const roleDao = require('../models')['role']
module.exports =class RoleService {

  /**
   * 分页查询数据
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  static async queryPage (ctx) {
    let pageNo = parseInt(ctx.query.pageNo) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 10
    delete ctx.query.pageNo
    delete ctx.query.pageSize
    ctx.body =await SystemUtil.queryPage(roleDao,ctx.query,pageNo,pageSize)
  }

  /**
   * 新建角色
   * @param {name} password 角色名称
   */
  static async add (ctx) {
    const roleName = ctx.request.body.roleName
    if (StringUtil.someNull([roleName])) {
      ctx.body = SystemUtil.createResult({success: false, message: '角色名不能为空'})
    }
    const roleInfo = await roleDao.findOne({where: {roleName}})
    const isExistsRole = roleInfo != null
    if (!isExistsRole) {
      const message = '新建角色' + roleName + '成功'
      const data = await roleDao.create({
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
  static async update (ctx) {
    const roleName = ctx.request.body.roleName
    const id = ctx.params.id
    if (StringUtil.isNull(roleName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await roleDao.update({roleName}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  static async destroy (ctx) {
    const count = await roleDao.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }

}
