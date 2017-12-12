const router = require('koa-router')()
const S = require('../service')

const WeiboService = new (require('../service/WeiboService'))()

/* 权限验证相关接口 */
router.post('/login', (ctx) => S['auth'].login(ctx))// 登录
router.get('/weiboSsoLogin', (ctx) => WeiboService.ssoLogin(ctx))// 微博单点登录
router.get('/isExistPhone', (ctx) => S['auth'].isExistPhone(ctx))// 判断号码是否存在
router.get('/xmas', (ctx) => {
  ctx.response.body ="<script>window.location.href='http://www.baidu.com'</script>"
})// 判断号码是否存在

module.exports = router
