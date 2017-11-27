/**
 * ------------------------------------------------------------------
 * 上传组件
 * ------------------------------------------------------------------
 */
import WebUploader from 'webuploader'
import uuidv1 from 'uuid/v1'
import template from './index.html'
import API from 'api'
import AuthService from '@/service/AuthService'

avalon.component('r-upload', {
  template: template,
  defaults: {
    tid: '',
    previewId:'',
    $uploadTarget: {},
    fileItems:[],
    /*文件上传默认配置*/
    webUploaderDefaultConfig: {
      // 选完文件后，是否自动上传。
      auto: true,
      // 文件接收服务端。
      server: '/api/file/upLoadFile',
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: '#filePicker',
      // 只允许选择图片文件。
      accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
      },
      thumbnailWidth:100,
      thumbnailHeight:100,
      formData:{},
    },
    /*上传配置*/
    webUploaderConfig: {},
    onInit: async function () {
      const ctx = this
      ctx.tid = uuidv1()
      ctx.previewId = uuidv1()
      ctx.webUploaderDefaultConfig.pick = '#'+ ctx.tid
    },
    /*成功回调*/
    successCall: avalon.noop,
    getFileItem:function(id){
      let result = {}
      this.fileItems.forEach(function(el){
        if(el.id == id)
          result = el
      })
      return result
    },
    onReady: function () {
      const ctx = this
      ctx.webUploaderConfig = avalon.mix(ctx.webUploaderDefaultConfig.$model,ctx.webUploaderConfig.$model)
      const uploader = WebUploader.create(ctx.webUploaderConfig)
      // 防止模态窗按钮无效
      $('#'+ctx.tid).find('.webuploader-pick').mouseenter(function(){
        uploader.refresh()
      })
      uploader.on('uploadBeforeSend', function(block, data, headers) {
        headers.Authorization='Bearer ' + AuthService.getToken()
      })
      uploader.on('beforeFileQueued',function(){
        ctx.fileItems = []
        uploader.reset()
      })
      // 当有文件添加进来的时候
      uploader.on( 'fileQueued', async function (file) {
        console.log(uploader)
        const md5 = await uploader.md5File(file)
        const res = await API[API.KEY.FILE].getFileByMd5({md5})
        uploader.makeThumb(file, function (error, src) {
          let isImage = true
          if (error) {
            isImage=false
          }
         ctx.fileItems.push({
            isImage,
            thumb:src,
            id:file.id,
            ext:file.ext,
            md5:md5,
            statusText:file.statusText,
            status:0,
            name:file.name,
            percentage:0,
         })
        }, ctx.webUploaderDefaultConfig.thumbnailWidth, ctx.webUploaderDefaultConfig.thumbnailHeight);
      })
      uploader.on( 'uploadProgress', function( file, percentage ) {
        ctx.getFileItem(file.id).percentage = percentage*100
      })
      uploader.on( 'uploadSuccess', function( file ) {
        ctx.getFileItem(file.id).status = 1
      })
      uploader.on( 'uploadError', function( file ) {
        const fileItem = ctx.getFileItem(file.id)
        fileItem.status = 2
        fileItem.statusText = '上传失败'
      })
    }
  }
})
