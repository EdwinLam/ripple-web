const SystemConfig = require('../config/SystemConfig')
const SinaCloud = require('scs-sdk')
const fs =require('fs')
var config = new SinaCloud.Config({
  accessKeyId: SystemConfig.accessKeyId,
  secretAccessKey: SystemConfig.secretAccessKey,
  sslEnabled: SystemConfig.sslEnabled
})
SinaCloud.config = config
const myBucket = new SinaCloud.S3({params: {Bucket: 'ripple'}})
module.exports =class UploadApi {
  uploadFile(filePath,dirName,md5){
    return new Promise(async function (resolve, reject) {
      const file = fs.createReadStream(filePath)
      const params = {Key: dirName+'/'+md5, Body: file}
      myBucket.putObject(params,function(error, response) {
        if (error) {
          reject(error)
        } else {
           fs.unlink(filePath)
          resolve(params.Key)
        }
      })
    })
  }
}

