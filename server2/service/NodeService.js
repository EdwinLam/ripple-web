const SystemUtil = require('../utils/SystemUtil.js')

module.exports = class NodeService{
  /*
   * 获取所有节点
   */
  async all (ctx) {
    let success = false
    const data =await ctx.m.node.findAll()
    ctx.body = SystemUtil.createResult({success,  data})
  }
}
