const nodeDao = require('../models')['node']
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class NodeService {
  /**
   * 新建
   * @param {String} pCode 父分组Code 根目录为0
   * @param {String} pName 父分组名称
   * @param {name} password 角色名称
   */
  static async create (ctx) {
    const pCode = ctx.request.body.pCode
    const name = ctx.request.body.name
    if (StringUtil.isNull(name)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    const item = await nodeDao.findOne({where: {pCode,name}})
    const isExists = item != null
    if (!isExists) {
      ctx.body =await this.baseCreate(ctx.request.body)
    } else {
      const message ='该节点下已存在' + name + '的节点'
      ctx.body = SystemUtil.createResult({success: false, message: message})
    }
  }

  /*
   * 更新分组
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  static async update (ctx) {
    const name = ctx.request.body.name
    const id = ctx.params.id
    const updatedAt = new Date().getTime()
    if (StringUtil.isNull(name)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await this.Dao.update( {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 获取指定code角色的节点权限(根角色默认所有节点可选)
   * @param {code} 角色code
   */
  async getCanSelectNodes (ctx) {
    const code = ctx.query.code
    console.log(ctx.query)
    if (StringUtil.isNull(code)) {
      ctx.body = SystemUtil.createResult({success: false, message: 'code不能为空'})
    }
    let where = null
    if(code != 0) {
      where={code:code}
    }
    const result = await this.Dao.findAndCount({where})
    ctx.body = SystemUtil.createResult({success: true, message: '成功获取', data: result})
  }
}
