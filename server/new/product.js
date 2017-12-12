/*类目表 */
module.exports = function(sequelize, DataTypes) {
  const  product = sequelize.define('product', {
    productName: {
      type: DataTypes.STRING
    },
    brandId: {
      type: DataTypes.INTEGER
    },
    priceRange: {
      type: DataTypes.BOOLEAN
    }
  })
  product.associate = function(modules){
  }
  return product
}
