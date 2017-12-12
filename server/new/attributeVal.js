/*类目表 */
module.exports = function(sequelize, DataTypes) {
  const  type = sequelize.define('attribute', {
    attributeId: {
      type: DataTypes.INTEGER
    },
    attributeValName: {
      type: DataTypes.STRING
    },
    typeId: {
      type: DataTypes.INTEGER
    },
    order:{
      type:DataTypes.INTEGER
    }
  })
  type.associate = function(modules){
  }
  return brand
};
