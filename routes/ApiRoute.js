const router = require('koa-router')()
const UserService = require('../service/UserService')
const RoleService = require('../service/RoleService')
const GroupService = require('../service/GroupService')
const NodeService = require('../service/NodeService')

const _ = require('lodash')

/* 公用基础接口 */
router.get('/:module/queryPage', (ctx) => require('../service/'+ _.upperFirst(ctx.params.module)+'Service').queryPage(ctx)) // 分页查询用户信息
router.del('/:module/:id', (ctx) => require('../service/'+ _.upperFirst(ctx.params.module)+'Service').destroy(ctx)) // 删除指定id数据
router.get('/:module/queryTree', (ctx) => require('../service/'+ _.upperFirst(ctx.params.module)+'Service').queryTree(ctx))// 树状数据


/* 用户相关接口 */
router.get('/user/isExistPhone', (ctx) => UserService.isExistPhone(ctx))// 判断号码是否存在
router.post('/user/create', (ctx) => UserService.createUser(ctx))// 创建用户
router.post('/user/:id', (ctx) => UserService.updateUser(ctx))// 更新用户
router.get('/user/getUserInfo', (ctx) => UserService.getUserInfo(ctx))// 获取登录用户信息

/* 角色相关接口 */
router.post('/role/create', (ctx) => RoleService.createRole(ctx))// 创建角色
router.post('/role/:id', (ctx) => RoleService.updateUser(ctx))// 更新用户

/* 分组相关接口 */
router.post('/group/create', (ctx) => GroupService.create(ctx))
router.post('/group/:id', (ctx) => GroupService.update(ctx))

/* 节点相关接口 */
router.post('/node/create', (ctx) => NodeService.create(ctx))
router.post('/node/:id', (ctx) => NodeService.update(ctx))
router.get('/node/getCanSelectNodes', (ctx) => NodeService.getCanSelectNodes(ctx))//获取角色可以选择的节点

module.exports = router
