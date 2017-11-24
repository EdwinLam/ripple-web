/**
 * ------------------------------------------------------------------
 * 上传组件
 * ------------------------------------------------------------------
 */
import uuidv1 from 'uuid/v1'
import SparkMD5 from 'spark-md5'
import template from './index.html'
import AuthService from '@/service/AuthService'
import API from 'api'

avalon.component('r-upload', {
  template: template,
  defaults: {
    tid:'',
    $uploadTarget:{},
    fileInputConfig:{
      uploadExtraData:{},
      theme:'fa',
      showUpload:false, //是否显示上传按钮
      language: 'zh', //设置语言,
      uploadUrl:'/api/file/upLoadFile',
      showPreview :false, //是否显示预览
      dropZoneEnabled: false,
      maxFileSize: 512,
      allowedPreviewTypes : [ 'image' ],
      allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
      minImageWidth: 54, //图片的最小宽度
      minImageHeight: 54,//图片的最小高度
      maxImageWidth: 64,//图片的最大宽度
      maxImageHeight: 64,//
      // 图片的最大高度
      ajaxSettings:{
        headers: {
          Authorization:  'Bearer ' + AuthService.getToken()
        }
      }
    },
    onInit: async function () {
      const ctx = this
      ctx.tid = uuidv1()
    },
    successCall:avalon.noop,
    onReady:function(){
      const ctx = this
      ctx.$uploadTarget = $("#"+ctx.tid)
      ctx.$uploadTarget.fileinput(ctx.fileInputConfig)
      ctx.$uploadTarget.on('fileuploaded', function (event, data, previewId, index) {
        ctx.successCall(data)
      })
      ctx.bindMD5Upload(async (md5) => {
        console.info('computed hash', md5);  // Compute hash
        const res = await API[API.KEY.FILE].getFileByMd5({md5})
        console.log(ctx.$uploadTarget.data('fileinput'))
        if(res.data.rows.length){
         ctx.successCall(res.data.rows[0])
        }else{
          ctx.$uploadTarget.data('fileinput').uploadExtraData={md5}
          ctx.$uploadTarget.fileinput("upload")
        }
      })
    },
    bindMD5Upload:function(callback){
      const ctx = this
      ctx.$uploadTarget.change(function(){
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        const  file = this.files[0]
        const chunkSize = 2097152
        const chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        let spark =  new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.onload = function (e) {
          spark.append(e.target.result)
          currentChunk++
          if (currentChunk < chunks) {
            loadNext();
          } else {
            callback(spark.end())
          }
        }
        fileReader.onerror = function () {
          console.warn('oops, something went wrong.');
        }
        function loadNext() {
          const start = currentChunk * chunkSize
          const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }
        loadNext();
      })

    }
  }
})
