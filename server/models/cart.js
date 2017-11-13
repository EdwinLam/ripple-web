/* 购物车表 */
module.exports = function(sequelize, DataTypes) {
  let cart = sequelize.define('cart', {

  })
  cart.associate = function(modules){
    cart.belongsToMany(modules.goodSale, {through: modules.cartGoodSales, foreignKey: 'cartId'})
    modules.goodSale.belongsToMany(cart, {through: modules.cartGoodSales, foreignKey: 'goodSaleId'})
    cart.belongsTo(modules.user)
  }
  return cart
}