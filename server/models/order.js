/* 订单表 */
module.exports = function(sequelize, DataTypes) {
  const  order = sequelize.define('order', {
    orderNo:{
      type: DataTypes.STRING
    },
    totalAmount: {
      type: DataTypes.INTEGER
    },
    payAmount: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING
    },
    recipientName:{
      type:DataTypes.STRING
    },
    /*
    * 0-cash 现金支付
    * 1-wechat 微信支付
    * */
    payType:{
      type:DataTypes.STRING
    },
    recipientGender:{
      type:DataTypes.STRING
    },
    recipientTel:{
      type:DataTypes.STRING
    },
    recipientAddress:{
      type:DataTypes.STRING
    }
  })
  order.associate = function(modules){
    modules.user.hasMany(order)
    order.belongsTo(modules.user)
    order.belongsToMany(modules.goodSale, {through: modules.orderGoodSales, foreignKey: 'orderId'})
    modules.goodSale.belongsToMany(order, {through: modules.orderGoodSales, foreignKey: 'goodSaleId'})
  }
  return order
};
