const router = require('koa-router')()
const UserService = require('../service/UserService')
/* 用户相关接口 */
router.post('/login', (ctx) => UserService.login(ctx))// 登录
module.exports = router
