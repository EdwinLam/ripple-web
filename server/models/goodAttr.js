/* 物品属性表 */
module.exports = function(sequelize, DataTypes) {
  const  goodAttr = sequelize.define('goodAttr', {
    name: {
      type: DataTypes.STRING
    }
  })
  goodAttr.associate = function(modules){
    //商品<--n:n-->商品具体属性
    modules.good.belongsToMany(goodAttr, {through: 'GoodARelations', foreignKey: 'goodId'})
    goodAttr.belongsToMany(modules.good, {through: 'GoodARelations', foreignKey: 'goodAttrId'})
  }
  return goodAttr
}
