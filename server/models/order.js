/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  order = sequelize.define('order', {
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
    order.belongsToMany(modules.good, {through: 'OrderGoods', foreignKey: 'orderId'})
    modules.good.belongsToMany(order, {through: 'OrderGoods', foreignKey: 'goodId'})
  }
  return order
};
