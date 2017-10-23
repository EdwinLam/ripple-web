const router = require('koa-router')()
const AuthService = require('../service/AuthService')
const WeiboService = new (require('../service/WeiboService'))()

/* 权限验证相关接口 */
router.post('/login', (ctx) => AuthService.login(ctx))// 登录
router.get('/weiboSsoLogin', (ctx) => WeiboService.ssoLogin(ctx))// 微博单点登录
router.get('/isExistPhone', (ctx) => AuthService.isExistPhone(ctx))// 判断号码是否存在

module.exports = router
