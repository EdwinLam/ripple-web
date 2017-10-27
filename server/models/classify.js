/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const  classify = sequelize.define('classify', {
    classifyName: {
      type: DataTypes.STRING
    },
    remark: {
      type: DataTypes.STRING
    },
    iconUrl:{
      type: DataTypes.STRING
    },
    thumbUrl:{
      type: DataTypes.STRING
    }
  })
  return classify
};
