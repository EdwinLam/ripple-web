const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class CartService {

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
    const include= [
      M['user'],M['good']
    ]
    ctx.body =await SystemUtil.queryPage(M['cart'],ctx.query,pageNo,pageSize)
  }

  static async get(ctx){
    let success = true
    let message = '查询成功'
    const id = ctx.params.id
    const data = await M['cart'].findById(id,{
      include:[ M['user'],M['good']]
    })
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
   */
  static async save (ctx) {
    let success = true
    let message = '新建成功'
    const data = await M['cart'].create(ctx.request.body)
    ctx.body = SystemUtil.createResult({success,message,data})
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
    await M['cart'].update( {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  static async delete (ctx) {
    const count = await M['cart'].destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }
}
