/* 品牌系列表表 */
module.exports = function(sequelize, DataTypes) {
  const  brand = sequelize.define('brand', {
    typeId: {
      type: DataTypes.INTEGER
    },
    cnName: {
      type: DataTypes.STRING
    },
    enName: {
      type: DataTypes.STRING
    },
    desc:{
      type:DataTypes.STRING
    },
    logo: {
      type: DataTypes.STRING
    },
    brandUrl: {
      type: DataTypes.STRING
    },
    brandStory: {
      type: DataTypes.STRING
    }
  })
  brand.associate = function(modules){
  }
  return brand
};
