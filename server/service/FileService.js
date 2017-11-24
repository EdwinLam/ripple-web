const M = require('../models')
const SystemUtil = require('../util/SystemUtil.js')
const BaseService = require("./BaseService")
const API = require("../api")
module.exports = class ClassifyService extends BaseService {
  constructor () {
    super('file')
  }

  async upLoadFile (ctx) {
    let dirName = ctx.request.body.dirName
    let md5 = ctx.req.body.md5
    let success = true
    let message = '上传成功'
    const reqFile = ctx.req.file
    const file =await M['file'].findOrCreate({where:{md5},defaults:{md5,path:reqFile.path,mimeType:reqFile.mimetype,size:reqFile.size}})
    await API['upload'].uploadFile(reqFile.path, dirName,md5)
    const data =file[0]
    ctx.body = SystemUtil.createResult({success, message, data})
  }
}