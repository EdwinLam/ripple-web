/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  node = sequelize.define('node', {
    nodeName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })
  node.associate = function(modules){
    node.belongsTo(node)
    node.belongsToMany(modules.role, {through: 'roleNodes', foreignKey: 'nodeId'})
    modules.role.belongsToMany(node, {through: 'roleNodes', foreignKey: 'roleId'})
  }
  return node
};
