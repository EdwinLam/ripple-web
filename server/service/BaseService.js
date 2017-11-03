const db = require('../models')
const addressDao = db['address']
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class BaseService {
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
    ctx.body = await SystemUtil.queryPage(addressDao, ctx.query, pageNo, pageSize)
  }

  static async get (ctx) {
    let success = true
    let message = '查询成功'
    const id = ctx.params.id
    const data = addressDao.findById(id)
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
    const data = await addressDao.create(ctx.request.body)
    ctx.body = SystemUtil.createResult({success, message, data})
  }

  /*
   * 更新
   */
  static async update (ctx) {
    const id = ctx.params.id
    await addressDao.update(ctx.request.body,{where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  static async delete (ctx) {
    const count = await addressDao.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }
}
