const SystemConfig = require('../config/SystemConfig')
const SinaCloud = require('scs-sdk')
const fs =require('fs')
var md5 = require('md5')
var config = new SinaCloud.Config({
  accessKeyId: SystemConfig.accessKeyId,
  secretAccessKey: SystemConfig.secretAccessKey,
  sslEnabled: SystemConfig.sslEnabled
})
SinaCloud.config = config
const myBucket = new SinaCloud.S3({params: {Bucket: 'ripple'}})
module.exports =class UploadApi {
  uploadFile(filePath,path){
    return new Promise(async function (resolve, reject) {
      const file = fs.createReadStream(filePath)
      const md5 = await md5(file)
      const params = {Key: path + '/' + md5, Body: file}
      myBucket.putObject(params,function(error, response) {
        if (error) {
          reject(error)
        } else {
           fs.unlink({filePath,md5})
          resolve(params.Key)
        }
      })
    })
  }
}

