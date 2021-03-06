const SystemConfig = require('../config/SystemConfig')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db=require('../models')
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
  static async queryPage (dao, condition, pageNo, pageSize,include) {
    let success = true
    let message = '查询成功'
    include = !include?[]:include
    let data = await dao.findAndCount({
      where: condition,
      limit: pageSize,
      offset: (pageNo - 1) * pageSize,
      include
    })
    data.pageNo = pageNo
    data.pageSize = pageSize
    return this.createResult({success, message, data})
  }
  static getCp(specs) {
    if (!specs || specs.length == 0) {
      return [];
    } else {
      return joinSpec([[]], specs, 0, specs.length-1);
    }
    function joinSpec(prevProducts, specs, i, max) {
      var currentProducts = [], currentProduct, currentSpecs = specs[i];
      if ( i > max ) {
        return prevProducts;
      }
      prevProducts.forEach(function(prevProduct) {
        currentSpecs.forEach(function(spec) {
          currentProduct = prevProduct.slice(0);
          currentProduct.push(spec);
          currentProducts.push(currentProduct);
        });
      });
      return joinSpec(currentProducts, specs, ++i, max);
    }
  }
}