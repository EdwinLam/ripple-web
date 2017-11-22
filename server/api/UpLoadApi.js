const SystemConfig = require('../config/SystemConfig')
const SinaCloud = require('scs-sdk')
const utils = require('utility')
var crypto = require('crypto')
var config = new SinaCloud.Config({
  accessKeyId: SystemConfig.accessKeyId,
  secretAccessKey: SystemConfig.secretAccessKey,
  sslEnabled: SystemConfig.sslEnabled
})
SinaCloud.config = config
const myBucket = new SinaCloud.S3({params: {Bucket: 'ripple'}})

module.exports =class UploadApi {
  uploadFile(filePath,path,name){
    return new Promise(async function (resolve, reject) {
      const file = require('fs').createReadStream(filePath);
      const hash = await utils.md5(file)
      const params = {Key: path + '/' + hash, Body: file}
      myBucket.putObject(params, function (error, response) {
        if (error) {
          reject(error)
        } else {
          resolve(params.Key)
        }
      })
    })
  }
}

