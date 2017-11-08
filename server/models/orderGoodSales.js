/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const orderGoodSales = sequelize.define('orderGoodSales', {
    num:{type: DataTypes.INTEGER},
    totalPrice:{type: DataTypes.INTEGER}
  })
  return orderGoodSales
}
