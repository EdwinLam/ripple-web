/*类目表 */
module.exports = function(sequelize, DataTypes) {
  const  product = sequelize.define('productImage', {
    url: {
      type: DataTypes.STRING
    },
    productId: {
      type: DataTypes.INTEGER
    },
    position: {
      type: DataTypes.INTEGER
    },
    isMain: {
      type: DataTypes.INTEGER
    }
  })
  product.associate = function(modules){
  }
  return product
}
