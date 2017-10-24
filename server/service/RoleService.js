const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const _ = require('lodash');
module.exports =class RoleService {

  /**
   * 新建角色
   * @param {String} pCode 父角色Code 根目录为0
   * @param {String} pName 父角色名称
   * @param {name} password 角色名称
   */
  async createRole (ctx) {
    const pCode = ctx.request.body.pCode
    const pName = ctx.request.body.pName
    const name = ctx.request.body.name
    if (StringUtil.someNull([name])) {
      ctx.body = SystemUtil.createResult({success: false, message: '角色名不能为空'})
    }
    const roleInfo = await this.Dao.findOne({where: {pCode,name}})
    const isExistsRole = roleInfo != null
    if (!isExistsRole) {
      const message = '新建角色' + name + '成功'
      const createdAt = new Date().getTime()
      const updatedAt = new Date().getTime()
      const status = 1
      const code = uuidv1()
      const data = await this.Dao.create({
        pCode,pName,name,createdAt,updatedAt,status,code
      })
      ctx.body = SystemUtil.createResult({success: true, message, data})
    } else {
      const message = pName+'已存在' + name + '角色'
      ctx.body = SystemUtil.createResult({success: false, message})
    }
  }

  /*
   * 更新用户
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  async updateRole (ctx) {
    const name = ctx.request.body.name
    const id = ctx.params.id
    const updatedAt = new Date().getTime()
    if (StringUtil.isNull(name)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await this.Dao.update({name,updatedAt}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

}
