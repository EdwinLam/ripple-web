const router = require('koa-router')()
const UserService = require('../service/UserService')
const RoleService = require('../service/RoleService')
const NodeService = require('../service/NodeService')

/* 用户相关接口 */
router.get('/user/queryPage', (ctx) => UserService.queryPage(ctx))
router.post('/user/add', (ctx) => UserService.add(ctx))
router.post('/user/:id', (ctx) => UserService.update(ctx))
router.get('/user/getUserInfo', (ctx) => UserService.getUserInfo(ctx))
router.del('/user/:id', (ctx) =>UserService.destroy(ctx))
router.post('/user/:id', (ctx) => UserService.update(ctx))

/* 角色相关接口 */
router.post('/role/create', (ctx) => RoleService.createRole(ctx))// 创建角色
router.post('/role/:id', (ctx) => RoleService.updateUser(ctx))// 更新用户

/* 节点相关接口 */
router.post('/node/create', (ctx) => NodeService.create(ctx))
router.post('/node/:id', (ctx) => NodeService.update(ctx))
router.get('/node/getCanSelectNodes', (ctx) => NodeService.getCanSelectNodes(ctx))//获取角色可以选择的节点

module.exports = router
