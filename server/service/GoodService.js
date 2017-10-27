const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class GoodService {
  /**
   * 获取首页展示物品
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  static async indexGoodShow(ctx){
    let size = parseInt(ctx.query.size) || 3
    const res = await M['classify'].findAll({
      include: [
      { model: M['good'],
        limit: size,
        order: [['id','desc']],
        include:M['goodImage']
      },
      {model:M['classifyImage']}
    ]})
    ctx.body = SystemUtil.createResult({success: true, message: '查询成功',data:res})
  }
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
    ctx.body =await SystemUtil.queryPage(M['good'],ctx.query,pageNo,pageSize)
  }

  static async get(ctx){
    let success = true
    let message = '查询成功'
    const id = ctx.params.id
    const data = M['good'].findById(id)
    if(data){
      ctx.body = SystemUtil.createResult({success, message,data})
    }else{
      success = false
      message = '不存在id为'+id+'的数据'
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
    const nodeId = ctx.request.body.nodeId
    const nodeName = ctx.request.body.nodeName
    if (StringUtil.isNull(nodeName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    const item = await M['good'].findOne({where: {nodeId,nodeName}})
    if (item == null) {
      const data = await M['good'].create(ctx.request.body)
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
    await M['good'].update( {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  static async delete (ctx) {
    const count = await M['good'].destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }
}
