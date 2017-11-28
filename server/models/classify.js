/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const  classify = sequelize.define('classify', {
    classifyName: {
      type: DataTypes.STRING
    },
    remark: {
      type: DataTypes.STRING
    }
  })
  classify.associate = function(modules){
    classify.belongsTo(modules.file,{foreignKey:'iconFileId'})
    classify.belongsTo(modules.file,{foreignKey:'thumbFileId'})
  }
  return classify
};
