const nodeDao = require('../models')['node']
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")

module.exports = class NodeService extends BaseService{
  constructor () {
    super('node')
  }
  /**
   * 获取所有模块
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  async getAllModules(ctx){
    let success = true
    let message = '新建成功'
    let data = await nodeDao.findAll({
      where: {level:0}
    })
    ctx.body = SystemUtil.createResult({success,  data})

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
    const nodeId = ctx.request.body.nodeId
    const nodeName = ctx.request.body.nodeName
    if (StringUtil.isNull(nodeName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    const item = await nodeDao.findOne({where: {nodeId,nodeName}})
    if (item == null) {
      const data = await nodeDao.create(ctx.request.body)
      ctx.body = SystemUtil.createResult({success,message,data})
    } else {
      message ='该节点下已存在' + nodeName + '的节点'
      success = false
      ctx.body = SystemUtil.createResult({success,  message})
    }
  }
}
