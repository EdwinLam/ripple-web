/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const orderGoods = sequelize.define('orderGoods', {
    num:{type: DataTypes.INTEGER},
    totalPrice:{type: DataTypes.INTEGER}
  })
  return orderGoods
}
