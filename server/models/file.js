/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  file = sequelize.define('file', {
    originalName: {
      type: DataTypes.STRING
    },
    mimeType:{
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING
    },
    md5: {
      type: DataTypes.STRING
    },
    size:{
      type:DataTypes.STRING
    }
  })
  file.associate = function(modules){

  }
  return address
};
