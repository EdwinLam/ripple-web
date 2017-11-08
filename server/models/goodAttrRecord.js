/* 物品属性具体值表 */
module.exports = function(sequelize, DataTypes) {
  const  goodAttrRecord = sequelize.define('goodAttrRecord', {
    val:{
      type: DataTypes.STRING
    },
    isSale:{
     type:DataTypes.INTEGER
    }
  })
  goodAttrRecord.associate = function(modules){
    //商品<--1:n-->商品具体属性
    modules.good.hasMany(goodAttrRecord)
    goodAttrRecord.belongsTo(modules.good)
    //商品属性 <--1:n-->商品具体属性
    goodAttrRecord.belongsTo(modules.goodAttr)
    modules.goodAttr.hasMany(goodAttrRecord)
  }
  return goodAttrRecord
}
