/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  file = sequelize.define('file', {
    name:{
      type: DataTypes.STRING
    },
    type:{
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING
    },
    md5: {
      type: DataTypes.STRING
    },
    size:{
      type: DataTypes.INTEGER
    }
  })
  file.associate = function(modules){

  }
  return file
};
