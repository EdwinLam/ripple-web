/* 用户角色表 */
module.exports = function(sequelize, DataTypes) {
  let role = sequelize.define('role', {
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    headImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
  role.associate = function(modules){
    role.belongsToMany(modules.user, {as: 'Role',through: 'UserRoles', foreignKey: 'roleId'})
    modules.user.belongsToMany(role, {as:'User',through: 'UserRoles', foreignKey: 'userId'})
  }
  return role
}
