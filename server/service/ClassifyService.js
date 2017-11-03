const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")

module.exports = class ClassifyService extends BaseService{
  constructor () {
    super('classify')
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
    const include= [{
      model: M['good'],
      limit: 2,
      order: [['id','desc']]
    }]
    ctx.body =await SystemUtil.queryPage(M['classify'],ctx.query,pageNo,pageSize,include)
  }
}
