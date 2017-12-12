/*类目表 */
module.exports = function(sequelize, DataTypes) {
  const  type = sequelize.define('type', {
    typeName: {
      type: DataTypes.STRING
    },
    parentTypeId: {
      type: DataTypes.INTEGER
    },
    isParent: {
      type: DataTypes.BOOLEAN
    },
    order:{
      type:DataTypes.INTEGER
    }
  })
  type.associate = function(modules){
  }
  return brand
};
