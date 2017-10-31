/* 用户角色表 */
module.exports = function(sequelize, DataTypes) {
  let CartGoods = sequelize.define('CartGoods', {
    goodNum:{type: DataTypes.INTEGER}
  })
  let cart = sequelize.define('cart', {

  })
  cart.associate = function(modules){
    cart.belongsToMany(modules.good, {through: CartGoods, foreignKey: 'cartId'})
    modules.good.belongsToMany(cart, {through: CartGoods, foreignKey: 'goodId'})
    cart.belongsTo(modules.user)
  }
  return cart
}