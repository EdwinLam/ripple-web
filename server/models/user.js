/* 用户表 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    weiboUid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    account: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    headImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
