const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")

module.exports = class UserService extends BaseService{
  constructor () {
    super('user')
  }


  /**
   * 新建用户
   * @param {String} name 用户名
   * @param {number} phone 电话号码
   * @param {number} password 密码
   */
  async save (ctx) {
    let userName = ctx.request.body.userName
    let phone = ctx.request.body.phone
    let password = ctx.request.body.password
    console.log(StringUtil.isNull(phone))
    if (StringUtil.isNull(phone)) {
      ctx.body = SystemUtil.createResult({success: false, message: '号码不能为空'})
      return
    }
    if (StringUtil.isNull(userName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '用户名不能为空'})
      return
    }
    if (StringUtil.isNull(password)) {
      ctx.body = SystemUtil.createResult({success: false, message: '密码不能为空'})
      return
    }
    // 检查是否已存在相同号码
    const userInfo = await M['user'].findOne({where: {phone: phone}})
    const isExistsUser = userInfo != null
    if (!isExistsUser) {
      const message = '新建用户' + userName + '成功'
      const data = await M['user'].create({
        userName: userName,
        password: SystemUtil.enCodePassword(password),
        phone: phone
      })
      ctx.body = SystemUtil.createResult({success: true, message, data})
    } else {
      const message = '已存在' + phone + '手机的用户'
      ctx.body = SystemUtil.createResult({success: false,message})
    }
  }

  /*
   * 更新用户
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  async update (ctx) {
    const userName = ctx.request.body.userName
    const id = ctx.params.id
    if (StringUtil.isNull(userName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await M['user'].update({userName}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  async getUserInfo (ctx) {
    let  userInfo = await M['user'].findOne({where: {id: ctx.state.user.id}})
    //获取权限信息
    ctx.body =SystemUtil.createResult({success: true, message: '获取成功', data:{
      userInfo:userInfo
    }})
  }
}
