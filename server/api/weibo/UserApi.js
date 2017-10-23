const axios = require('axios')
const SystemConfig = require('../../config/SystemConfig')
const SystemUtil = require('../../util/SystemUtil.js')

class UserApi {
  static async accessToken (code) {
    const postData = {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': SystemConfig.weibo_redirect_uri,
      'client_id': SystemConfig.weibo_client_id,
      'client_secret': SystemConfig.weibo_client_secret
    }
    try {
      const result = await UserApi.post(SystemConfig.weibo_url + 'oauth2/access_token', postData)
      return SystemUtil.createResult({success: true, message: '微博单点登录成功', value: result.data})
    } catch (err) {
      return SystemUtil.createResult({success: false, message: '微博单点登录失败', value: err.config.data})
    }
  }
  static async userShow (uid, accessToken) {
    const postData = {
      params: {
        access_token: accessToken,
        uid: uid,
        source: SystemConfig.weibo_client_id
      }
    }
    const result = await UserApi.get(SystemConfig.weibo_url + '2/users/show.json', postData)
    return result
  }
  static async get (url, postData) {
    try {
      const res = await axios.get(url, postData)
      return SystemUtil.createResult({success: true, message: '获取数据成功', value: res.data})
    } catch (err) {
      return SystemUtil.createResult({success: false, message: '获取数据失败', value: err.config.data})
    }
  }
  static async post (url, postData) {

  }
}
module.exports = UserApi
