const router = require('koa-router')()
const WeiboService = new (require('../service/WeiboService'))()
/* 微博api */
router.get('/ssoLogin', (ctx) => WeiboService.ssoLogin(ctx))// 微博单点登录

module.exports = router
