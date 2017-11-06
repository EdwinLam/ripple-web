/* 物品规格表 */
module.exports = function(sequelize, DataTypes) {
  const  goodSpec = sequelize.define('goodSpec', {
    name: {
      type: DataTypes.STRING
    }
  })
  goodSpec.associate = function(modules){
    modules.good.hasMany(goodSpec)
    goodSpec.belongsTo(modules.good)
  }
  return goodSpec
}
