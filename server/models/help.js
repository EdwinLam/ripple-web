/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  help = sequelize.define('help', {
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    }
  })
  return help
};
