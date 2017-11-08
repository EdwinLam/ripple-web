/* 物品属性表 */
module.exports = function(sequelize, DataTypes) {
  const  goodAttr = sequelize.define('goodAttr', {
    name: {
      type: DataTypes.STRING
    }
  })
  goodAttr.associate = function(modules){

  }
  return goodAttr
}
