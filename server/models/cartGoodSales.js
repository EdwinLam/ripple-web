/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const cartGoodSales = sequelize.define('cartGoodSales', {
    goodNum:{type: DataTypes.INTEGER}
  })
  return cartGoodSales
}
