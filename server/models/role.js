/* 用户角色表 */
module.exports = function(sequelize, DataTypes) {
  let role = sequelize.define('role', {
    roleName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    headImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
  role.associate = function(modules){
    role.belongsToMany(modules.user, {through: 'UserRoles', foreignKey: 'roleId'})
    modules.user.belongsToMany(role, {through: 'UserRoles', foreignKey: 'userId'})
  }
  return role
}
