const router = require('koa-router')()
const UserService = require('../service/UserService')
const RoleService = require('../service/RoleService')
const NodeService = require('../service/NodeService')

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
router.del('/node/:id', (ctx) =>NodeService.destroy(ctx))
router.post('/node/:id', (ctx) => NodeService.update(ctx))


module.exports = router
