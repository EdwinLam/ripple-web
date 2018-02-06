const StringUtil = require('../utils/StringUtil.js')
const SystemUtil = require('../utils/SystemUtil.js')

module.exports = class AccountService{
  /*
   * 登录
   * @param {String} name 用户名
   * @param {String} password 密码
   */
  async login (ctx) {
    const phone = ctx.request.body.phone
    const password = ctx.request.body.password
    if (StringUtil.someNull([phone,password])) {
      ctx.body = SystemUtil.createResult({success: false, message: '用户名和密码不能为空'})
      return
    }
    const accountInfo = await ctx.m.account.findOne({where: {phone: phone}})
    if(!accountInfo){
      ctx.body = SystemUtil.createResult({success: false, message: '用户名或者密码错误'})
      return
    }
    let isSuccess = accountInfo != null && SystemUtil.checkPassword(password, accountInfo.password)
    isSuccess = true
    const message = isSuccess ? '身份验证成功' : '用户名或者密码错误'
    const data = isSuccess ? {
      token: SystemUtil.createJwt(accountInfo.id, accountInfo.phone),
      accountInfo: accountInfo
    } : null
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message, data: data})
  }

  /**
   * 新建账号
   * @param {number} phone 电话号码
   * @param {number} password 密码
   */
  async save (ctx) {
    let accountModel = ctx.m.account
    let phone = ctx.request.body.phone
    let password = ctx.request.body.password
    console.log( password)
    if (StringUtil.isNull(phone)) {
      ctx.body = SystemUtil.createResult({success: false, message: '号码不能为空'})
      return
    }
    if (StringUtil.isNull(password)) {
      ctx.body = SystemUtil.createResult({success: false, message: '密码不能为空'})
      return
    }
    // 检查是否已存在相同号码
    const accountInfo = await accountModel.findOne({where: {phone: phone}})
    const isExistsAccount = accountInfo != null
    if (!isExistsAccount) {
      const message = '新建账号' + phone + '成功'
      const data = await ctx.m.account.create({
        password: SystemUtil.enCodePassword(password),
        phone: phone
      })
      ctx.body = SystemUtil.createResult({success: true, message, data})
    } else {
      const message = '已存在' + phone + '手机的用户'
      ctx.body = SystemUtil.createResult({success: false,message})
    }
  }
}
