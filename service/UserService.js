const BaseService = require('./BaseService')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const uuidv1 = require('uuid/v1')

class UserService extends BaseService {
  constructor () {
    super('ys_user')
  }

  /**
   * 判断号码是否已经存在
   * @param {number} phone 电话号码
   */
  async isExistPhone (ctx) {
    let phone = ctx.query.phone
    const user = await this.Dao.findOne({where: {phone: phone}})
    const isExists = user != null
    const message = (isExists ? '存在' : '不存在') + phone + '手机的用户'
    ctx.body = SystemUtil.createResult({success: isExists, message: message})
  }

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
    const userInfo = await this.Dao.findOne({where: {phone: phone}})
    const isSuccess = userInfo != null && SystemUtil.checkPassword(password, userInfo.password)
    const message = isSuccess ? '身份验证成功' : '用户名或者密码错误'
    const value = isSuccess ? {
      token: SystemUtil.createJwt(userInfo.id, userInfo.name),
      userInfo: userInfo
    } : null
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message, values: value})
  }

  /**
   * 新建用户
   * @param {String} name 用户名
   * @param {number} phone 电话号码
   * @param {number} password 密码
   */
  async createUser (ctx) {
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
        phone: phone,
        createdAt:new Date().getTime(),
        updatedAt:new Date().getTime(),
        status:1,
        code:uuidv1()
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
  async updateUser (ctx) {
    const nickname = ctx.request.body.nickname
    const id = ctx.params.id
    const updatedAt = new Date().getTime()
    if (StringUtil.isNull(nickname)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await this.Dao.update({nickname,updatedAt}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  async getUserInfo (ctx) {
    let  userInfo = await this.Dao.findOne({where: {id: ctx.state.user.id}})
    //获取权限信息
    ctx.body =SystemUtil.createResult({success: true, message: '获取成功', values:{
      userInfo:userInfo
    }})
  }
}
module.exports = new UserService()
