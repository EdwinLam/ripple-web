const M = require('../models')
const BaseService = require("./BaseService")
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class BannerService extends BaseService{
    constructor () {
      super('banner')
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
      model: M['bannerImage']
    }]
    ctx.body =await SystemUtil.queryPage(M['banner'],ctx.query,pageNo,pageSize,include)
  }
}
