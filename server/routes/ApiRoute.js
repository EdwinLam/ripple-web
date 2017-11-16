const router = require('koa-router')()
const S = require('../service')

/* 用户相关接口 */
router.get('/user/getUserInfo', (ctx) => S['user'].getUserInfo(ctx))

/* 节点相关接口 */
router.get('/node/getAllModules', (ctx) => S['node'].getAllModules(ctx))

/* 商品相关接口 */
router.get('/good/indexGoodShow', (ctx) => S['good'].indexGoodShow(ctx))
router.get('/good/queryByKeyWord', (ctx) => S['good'].queryByKeyWord(ctx))

/*购物车相关接口*/
router.post('/cart/addToCart', (ctx) => S['cart'].addToCart(ctx))
router.post('/cart/setCartGood', (ctx) => S['cart'].setCartGood(ctx))
router.post('/cart/getUserCart', (ctx) => S['cart'].getUserCart(ctx))
router.post('/cart/clearCart', (ctx) => S['cart'].clearCart(ctx))
router.post('/cart/delCartGood', (ctx) => S['cart'].delCartGood(ctx))

/*地址相关接口*/
router.post('/address/setDefaultAddress', (ctx) => S['address'].setDefaultAddress(ctx))
router.get('/address/getDefaultAddress', (ctx) => S['address'].getDefaultAddress(ctx))

/*订单相关接口*/
router.post('/order/saveOrder', (ctx) => S['order'].saveOrder(ctx))

for(let key in  S){
  router.get('/'+key, (ctx) => S[key].list(ctx))
  router.get('/'+key+'/:id', (ctx) => S[key].get(ctx))
  router.post('/'+key, (ctx) => S[key].save(ctx))
  router.put('/'+key+'/:id', (ctx) => S[key].update(ctx))
  router.del('/'+key+'/:id', (ctx) =>S[key].delete(ctx))
}

module.exports = router
