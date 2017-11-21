const SystemConfig = require('../config/SystemConfig')
const SinaCloud = require('scs-sdk')
var config = new SinaCloud.Config({
  accessKeyId: SystemConfig.accessKeyId,
  secretAccessKey: SystemConfig.secretAccessKey,
  sslEnabled: SystemConfig.sslEnabled
})
SinaCloud.config = config
const myBucket = new SinaCloud.S3({params: {Bucket: 'ripple'}})

module.exports =class UploadApi {
  uploadFile(filePath,path,name){
    return new Promise(function (resolve, reject) {
      var file = require('fs').createReadStream(filePath);
      var params = {Key: path+'/'+name, Body: file}
      myBucket.putObject(params, function(error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response)
        }
      })
    })
  }
}

