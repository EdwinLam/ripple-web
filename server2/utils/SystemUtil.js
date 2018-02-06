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
}