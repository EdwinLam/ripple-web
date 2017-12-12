/*类目表 */
module.exports = function(sequelize, DataTypes) {
  const  type = sequelize.define('attribute', {
    attributeName: {
      type: DataTypes.STRING
    },
    typeId: {
      type: DataTypes.INTEGER
    },
    isColor: {
      type: DataTypes.BOOLEAN
    },
    isEnum: {
      type: DataTypes.BOOLEAN
    },
    isInput: {
      type: DataTypes.BOOLEAN
    },
    isImportant: {
      type: DataTypes.BOOLEAN
    },
    isSale: {
      type: DataTypes.BOOLEAN
    },
    isNecessary :{
      type: DataTypes.BOOLEAN
    },
    isSearch: {
      type: DataTypes.BOOLEAN
    },
    isMultiSelect:{
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
