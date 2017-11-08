/* 物品属性销售表 */
module.exports = function(sequelize, DataTypes) {
  const  goodSale = sequelize.define('goodSale', {
    inventory:{
      type: DataTypes.INTEGER
    },
    thumbUrl:{
      type: DataTypes.STRING
    },
    price:{
      type: DataTypes.INTEGER
    }
  })
  goodSale.associate = function(modules){
    //商品销售属性<--n:n-->商品具体属性
    goodSale.belongsToMany(modules.goodAttrRecord, {through: 'GoodSRRelations', foreignKey: 'goodSaleId'})
    modules.goodAttrRecord.belongsToMany(goodSale, {through: 'GoodSRRelations', foreignKey: 'goodAttrRecordId'})
  }
  return goodSale
}
