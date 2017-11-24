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
    tid: '',
    $uploadTarget: {},
    /*文件上传默认配置*/
    fileInputDefaultConfig: {
      uploadExtraData: {},
      theme: 'fa',
      showUpload: false, //是否显示上传按钮
      language: 'zh', //设置语言,
      uploadUrl: '/api/file/upLoadFile',
      ajaxSettings: {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }
    },
    /*上传配置*/
    fileInputConfig: {},
    onInit: async function () {
      const ctx = this
      ctx.tid = uuidv1()
    },
    /*成功回调*/
    successCall: avalon.noop,
    onReady: function () {
      const ctx = this
      ctx.$uploadTarget = $("#" + ctx.tid)
      ctx.$uploadTarget.fileinput(avalon.mix(ctx.fileInputDefaultConfig.$model, ctx.fileInputConfig.$model))
      ctx.$uploadTarget.on('fileuploaded', function (event, data, previewId, index) {
        ctx.successCall(data)
      })
      /*绑定选择文件后获取md5事件*/
      ctx.bindMD5Upload(async (md5) => {
        const res = await API[API.KEY.FILE].getFileByMd5({md5})
        if (res.data.rows.length) {
          ctx.fakeUpload(function(){
            ctx.successCall(res.data.rows[0])
          })
        } else {
          ctx.$uploadTarget.data('fileinput').uploadExtraData = {md5}
          ctx.$uploadTarget.fileinput("upload")
        }
      })
    },
    fakeUpload:function(callback){
      const ctx = this
      const self = ctx.$uploadTarget.data('fileinput')
      self._resetUpload();
      self.$progress.show();
      self.uploadCount = 100;
      self.uploadStatus = {};
      self.uploadLog = [];
      const $h = self.$h
      var outData = self._getOutData(null, null), key = 0,
        $thumbs = self._getThumbs(':not(.file-preview-success)')
      $.each(self.filestack, function (key) {
        self.updateStack(key, undefined)
      })
      self._clearFileInput()
      if (self.showPreview) {
        $thumbs.each(function () {
          var $thumb = $(this);
          self._setThumbStatus($thumb, 'Success');
          $thumb.removeClass('file-uploading');
          $thumb.find('.kv-file-upload').hide().removeAttr('disabled');
        })
        self._initUploadSuccess(null);
      }
      self._setProgress(101)
      callback()
    },
    /*绑定选择文件后获取md5事件*/
    bindMD5Upload: function (callback) {
      const ctx = this
      ctx.$uploadTarget.change(function () {
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        const file = this.files[0]
        const chunkSize = 2097152
        const chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        let spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.onload = function (e) {
          spark.append(e.target.result)
          currentChunk++
          if (currentChunk < chunks) {
            loadNext()
          } else {
            callback(spark.end())
          }
        }
        fileReader.onerror = function () {
          avalon.warn('上传文件获取md5发生错误!');
        }
        function loadNext () {
          const start = currentChunk * chunkSize
          const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }
        loadNext();
      })

    }
  }
})
