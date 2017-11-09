/* 物品属性具体值表 */
module.exports = function(sequelize, DataTypes) {
  const  goodAttrRecord = sequelize.define('goodAttrRecord', {
    val:{
      type: DataTypes.STRING
    },
    isSale:{
     type:DataTypes.BOOLEAN
    }
  })
  goodAttrRecord.associate = function(modules){
    //商品属性 <--1:n-->商品具体属性
    goodAttrRecord.belongsTo(modules.goodAttr)
    modules.goodAttr.hasMany(goodAttrRecord)
  }
  return goodAttrRecord
}
