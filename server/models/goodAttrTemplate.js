/* 物品属性模板表 */
module.exports = function(sequelize, DataTypes) {
  const  goodAttrTemplate = sequelize.define('goodAttrTemplate', {
    name: {
      type: DataTypes.STRING
    }
  })
  goodAttrTemplate.associate = function(modules){
    //商品属性<--n:n-->商品模板
    goodAttrTemplate.belongsToMany(modules.goodAttr, {through: 'GoodTARelations', foreignKey: 'goodAttrTemplateId'})
    modules.goodAttr.belongsToMany(goodAttrTemplate, {through: 'GoodTARelations', foreignKey: 'goodAttrId'})
    //用户<--1:n-->商品模板
    modules.user.hasMany(goodAttrTemplate)
    goodAttrTemplate.belongsTo(modules.user)
  }
  return goodAttrTemplate
}
