const router = require('koa-router')()
const UserService = require('../service/UserService')
const RoleService = require('../service/RoleService')
const NodeService = require('../service/NodeService')
const BannerService = require('../service/BannerService')
const ClassifyService = require('../service/ClassifyService')
const GoodService = require('../service/GoodService')
const CartService = require('../service/CartService')
const AddressService = require('../service/AddressService')
const OrderService = require('../service/OrderService')

/* 基本resource接口生成 */
const needToGenerateItems = [
  {key:'banners',service:BannerService},
  {key:'classifies',service:ClassifyService},
  {key:'goods',service:GoodService},
  {key:'carts',service:CartService},
  {key:'addresses',service:AddressService},
  {key:'orders',service:OrderService}


]


needToGenerateItems.forEach(function(item){
  router.get('/'+item.key, (ctx) => item.service.list(ctx))
  router.get('/'+item.key+'/:id', (ctx) => item.service.get(ctx))
  router.post('/'+item.key, (ctx) => item.service.save(ctx))
  router.post('/'+item.key+'/:id', (ctx) => item.service.update(ctx))
  router.del('/'+item.key+'/:id', (ctx) =>item.service.delete(ctx))
})


/* 用户相关接口 */
router.get('/user/getUserInfo', (ctx) => UserService.getUserInfo(ctx))
router.get('/user/queryPage', (ctx) => UserService.queryPage(ctx))
router.post('/user/add', (ctx) => UserService.add(ctx))
router.del('/user/:id', (ctx) =>UserService.destroy(ctx))
router.post('/user/:id', (ctx) => UserService.update(ctx))

/* 角色相关接口 */
router.get('/role/queryPage', (ctx) => RoleService.queryPage(ctx))
router.post('/role/add', (ctx) => RoleService.add(ctx))
router.del('/role/:id', (ctx) =>RoleService.destroy(ctx))
router.post('/role/:id', (ctx) => RoleService.update(ctx))

/* 节点相关接口 */
router.get('/node/getAllModules', (ctx) => NodeService.getAllModules(ctx))
router.get('/node/queryPage', (ctx) => NodeService.queryPage(ctx))
router.post('/node/add', (ctx) => NodeService.add(ctx))
router.del('/node/:id', (ctx) => NodeService.destroy(ctx))
router.post('/node/:id', (ctx) => NodeService.update(ctx))

/* 商品相关接口 */
router.get('/good/indexGoodShow', (ctx) => GoodService.indexGoodShow(ctx))
router.get('/good/queryByKeyWord', (ctx) => GoodService.queryByKeyWord(ctx))

/*购物车相关接口*/
router.post('/cart/addToCart', (ctx) => CartService.addToCart(ctx))
router.post('/cart/setCartGood', (ctx) => CartService.setCartGood(ctx))
router.post('/cart/getUserCart', (ctx) => CartService.getUserCart(ctx))
router.post('/cart/clearCart', (ctx) => CartService.clearCart(ctx))
router.post('/cart/delCartGood', (ctx) => CartService.delCartGood(ctx))

/*地址相关接口*/
router.post('/address/setDefaultAddress', (ctx) => AddressService.setDefaultAddress(ctx))
router.get('/address/getDefaultAddress', (ctx) => AddressService.getDefaultAddress(ctx))

/*订单相关接口*/
router.post('/order/saveOrder', (ctx) => OrderService.saveOrder(ctx))

module.exports = router
