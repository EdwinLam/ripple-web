/* 分类 */
module.exports = function(sequelize, DataTypes) {
  const  classify = sequelize.define('classify', {
    path: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    }
  })
  return classify
};
