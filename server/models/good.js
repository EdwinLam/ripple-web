/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const  good = sequelize.define('good', {
    goodName: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.STRING
    },
    remark:{
      type: DataTypes.STRING
    }
  })
  good.associate = function(modules){
    modules.classify.hasMany(good)
    good.belongsTo(modules.classify)
  }
  return good
};