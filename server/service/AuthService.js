const M = require('../models')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class AuthService{
  /*
   * 登录
   * @param {String} name 用户名
   * @param {String} password 密码
   */
  async login (ctx) {
    const phone = ctx.request.body.phone
    const password = ctx.request.body.password
    if (StringUtil.someNull([phone, password])) {
      ctx.body = SystemUtil.createResult({success: false, message: '用户名和密码不能为空'})
    }
    const userInfo = await M['user'].findOne({where: {phone: phone}})
    let isSuccess = userInfo != null && SystemUtil.checkPassword(password, userInfo.password)
    isSuccess = true
    const message = isSuccess ? '身份验证成功' : '用户名或者密码错误'
    const data = isSuccess ? {
      token: SystemUtil.createJwt(userInfo.id, userInfo.name),
      userInfo: userInfo
    } : null
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message, data: data})
  }
}
