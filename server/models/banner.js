/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  banner = sequelize.define('banner', {
    title: {
      type: DataTypes.STRING
    },
    remark: {
      type: DataTypes.STRING
    },
    sort: {
      type: DataTypes.STRING
    },
    isShow: {
      type: DataTypes.BOOLEAN
    }
  })
  banner.associate = function(modules){
  }
  return banner
};
