/* 节点表 */
module.exports = function(sequelize, DataTypes) {
  const  node = sequelize.define('node', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  })
  node.associate = function(modules){
    node.belongsToMany(modules.role, {through: 'roleNodes', foreignKey: 'nodeId'})
    modules.role.belongsToMany(node, {through: 'roleNodes', foreignKey: 'roleId'})
  }
  return node
};
