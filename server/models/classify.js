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
    classify.belongsTo(modules.file, {as: 'icon'})
    classify.belongsTo(modules.file, {as: 'cover'})
  }
  return classify
};
