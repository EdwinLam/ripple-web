/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  goodImage = sequelize.define('goodImage', {
    path: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    }
  })
  goodImage.associate = function(modules){
    modules.good.hasMany(goodImage)
    goodImage.belongsTo(modules.good)
  }
  return goodImage
};
