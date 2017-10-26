/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  bannerImage = sequelize.define('bannerImage', {
    path: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    }
  })
  bannerImage.associate = function(modules){
    modules.banner.hasMany(bannerImage)
    bannerImage.belongsTo(modules.banner)
  }
  return bannerImage
};
