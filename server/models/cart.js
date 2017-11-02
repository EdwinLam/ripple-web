/* 用户角色表 */
module.exports = function(sequelize, DataTypes) {
  let cart = sequelize.define('cart', {

  })
  cart.associate = function(modules){
    cart.belongsToMany(modules.good, {through: modules.cartGoods, foreignKey: 'cartId'})
    modules.good.belongsToMany(cart, {through: modules.cartGoods, foreignKey: 'goodId'})
    cart.belongsTo(modules.user)
  }
  return cart
}