const M = require('../models')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")
const API = require("../api")
module.exports = class ClassifyService extends BaseService {
  constructor () {
    super('file')
  }

  async getFileByMD5 (ctx) {
    let success = true
    let message = '获取文件成功'
    const name = ctx.query.name
    const md5 = ctx.query.md5
    // 先判断是否存在文件
    const file =await M[this.key].findOne({where:{md5}})
    if (file != null) {
      const resultFile = await M[this.key].findOrCreate({
        where: {md5, name},
        defaults: {md5, path: file.path, type: file.type, size: file.size, name}
      })
      ctx.body = SystemUtil.createResult({success, message, data: resultFile[0]})
    } else {
      success = false
      message = '不存在文件'
      ctx.body = SystemUtil.createResult({success, message})
    }
  }

  async upLoadFile (ctx) {
    const dirName = ctx.req.body.dirName
    const md5 = ctx.req.body.md5
    const name = ctx.req.body.name
    const size = ctx.req.body.size
    const type = ctx.req.body.type
    let success = true
    let message = '上传成功'
    const reqFile = ctx.req.file
    const file = await  M[this.key].findOrCreate({
      where: {md5, name},
      defaults: {md5, path: dirName+'/'+md5, type, size, name}
    })
    await API['upload'].uploadFile(reqFile.path, dirName,md5)
    const data = file[0]
    ctx.body = SystemUtil.createResult({success, message, data})
  }
}