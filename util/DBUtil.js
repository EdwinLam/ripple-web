const Sequelize = require('sequelize')
const DBConfig = require('../config/DBConfig')
// 建立连接
const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
  host: DBConfig.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
  }
})

class DBUtil {
  /*
     * 获取对应的表操作对象
     * @param {Object} model 对应的表模型
     * */
  static getDao (model) {
    return sequelize.import('../models/' + model)
  }
}
module.exports = DBUtil
