/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const  classifyImage = sequelize.define('classifyImage', {

    url: {
      type: DataTypes.STRING
    }
  })
  classifyImage.associate = function(modules){
    modules.classify.hasMany(classifyImage)
    classifyImage.belongsTo(modules.classify)
    classifyImage.belongsTo(modules.file)
  }
  return classifyImage
};
