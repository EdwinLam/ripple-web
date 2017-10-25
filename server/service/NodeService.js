const nodeDao = require('../models')['node']
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class NodeService {

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
    ctx.body =await SystemUtil.queryPage(nodeDao,ctx.query,pageNo,pageSize)
  }

  /**
   * 获取所有模块
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
   static async getAllModules(ctx){
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
  static async add (ctx) {
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

  /*
   * 更新分组
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  static async update (ctx) {
    const nodeName = ctx.request.body.nodeName
    const id = ctx.params.id
    if (StringUtil.isNull(name)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await nodeDao.update( {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  static async destroy (ctx) {
    const count = await nodeDao.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }
}
