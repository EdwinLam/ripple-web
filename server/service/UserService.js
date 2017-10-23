const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

module.exports = class UserService{
  /**
   * 新建用户
   * @param {String} name 用户名
   * @param {number} phone 电话号码
   * @param {number} password 密码
   */
  static async add (ctx) {
    let nickname = ctx.request.body.nickname
    let phone = ctx.request.body.phone
    let password = ctx.request.body.password
    if (StringUtil.someNull([phone, password])) {
      ctx.body = SystemUtil.createResult({success: false, message: '用户名和密码不能为空'})
    }
    const userInfo = await this.Dao.findOne({where: {phone: phone}})
    const isExistsUser = userInfo != null
    if (!isExistsUser) {
      const message = '新建用户' + nickname + '成功'
      const value = await this.Dao.create({
        nickname: nickname,
        password: SystemUtil.enCodePassword(password),
        phone: phone
      })
      ctx.body = SystemUtil.createResult({success: true, message: message, values: value})
    } else {
      const message = '已存在' + phone + '手机的用户'
      ctx.body = SystemUtil.createResult({success: false, message: message})
    }
  }

  /*
   * 更新用户
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  static async updateUser (ctx) {
    const nickname = ctx.request.body.nickname
    const id = ctx.params.id
    const updatedAt = new Date().getTime()
    if (StringUtil.isNull(nickname)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await this.Dao.update({nickname,updatedAt}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  static async getUserInfo (ctx) {
    let  userInfo = await this.Dao.findOne({where: {id: ctx.state.user.id}})
    //获取权限信息
    ctx.body =SystemUtil.createResult({success: true, message: '获取成功', values:{
      userInfo:userInfo
    }})
  }
}
