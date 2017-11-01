/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  address = sequelize.define('address', {
    name: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    tel: {
      type: DataTypes.STRING
    },
    address:{
      type:DataTypes.STRING
    },
    isDef: {
      type: DataTypes.BOOLEAN
    }
  })
  address.associate = function(modules){
    modules.user.hasMany(address)
    address.belongsTo(modules.user)
  }
  return address
};
