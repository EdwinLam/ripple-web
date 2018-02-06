const M = require('../models')
const StringUtil = require('../utils/StringUtil.js')
const SystemUtil = require('../utils/SystemUtil.js')

module.exports = class BaseService {
  constructor (key) {
    if (key) { this.key = key }
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
    ctx.body = await SystemUtil.queryPage(M[this.key], ctx.query, pageNo, pageSize)
  }

  async get (ctx) {
    let success = true
    let message = '查询成功'
    const id = ctx.params.id
    const data = await M[this.key].findById(id)
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
  async save (ctx) {
    let success = true
    let message = '新建成功'
    ctx.request.body.userId = 1
    const data = await M[this.key].create(ctx.request.body)
    ctx.body = SystemUtil.createResult({success, message, data})
  }

  /*
   * 更新
   */
  async update (ctx) {
    const id = ctx.params.id
    await M[this.key].update(ctx.request.body,{where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  async delete (ctx) {
    const count = await M[this.key].destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }
}
