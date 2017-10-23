const BaseService = require('./BaseService')
const UserService = require('../service/UserService')
const UserApi = require('../api/weibo/UserApi.js')
const SystemUtil = require('../util/SystemUtil.js')

class WeiboService extends BaseService {
  async ssoLogin (ctx) {
    let token = ctx.query.token
    let uid = ctx.query.uid
    let userInfo = null
    let localToken = ''
    if (token == null) {
      const res = await UserApi.accessToken(ctx.query.code)
      if (!res.success) {
        ctx.body = res
        return
      }
      token = res.value.access_token
      uid = res.value.uid
      userInfo = await UserService.Dao.findOne({where: {weiboUid: uid}})
      localToken = SystemUtil.createJwt(userInfo.id, userInfo.name)
    }
    const weiboUserInfo = await UserApi.userShow(uid, token)
    const result = {userInfo: userInfo, weiboUserInfo: weiboUserInfo, token: localToken}
    ctx.body = SystemUtil.createResult({success: true, message: '成功获取', value: result})
  }
}
module.exports = WeiboService
