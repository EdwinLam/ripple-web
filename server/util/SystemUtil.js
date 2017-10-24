const SystemConfig = require('../config/SystemConfig')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
module.exports = class SystemUtil {
  /* 创建jwt */
  static createJwt (id, name) {
    return jwt.sign({
      name: name,
      id: id
    }, SystemConfig.secret)
  }
  /* 密码加密 */
  static enCodePassword (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  /* 统一返回格式标砖 */
  static createResult ({success, message, data}) {
    return {
      success: success,
      message: message,
      data: data  ?  data :{}
    }
  }
  /* 检查密码 */
  static checkPassword (password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword)
  }
  static async queryPage (dao, condition, pageNo, pageSize) {
    let success = true
    let message = '查询成功'
    let data = await dao.findAndCount({
      where: condition,
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
    data.pageNo = pageNo
    data.pageSize = pageSize
    return this.createResult({success, message, data})
  }
}