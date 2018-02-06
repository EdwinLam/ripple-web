const router = require('koa-router')()
/* 账号相关接口 */
router.post('/account/login', (ctx) => ctx.s.account.login(ctx))
router.post('/account/save', (ctx) => ctx.s.account.save(ctx))
/* 节点相关接口*/
router.get('/node/all', (ctx) => ctx.s.node.all(ctx))

module.exports = router
