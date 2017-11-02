/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const cartGoods = sequelize.define('cartGoods', {
    goodNum:{type: DataTypes.INTEGER}
  })
  return cartGoods
}
