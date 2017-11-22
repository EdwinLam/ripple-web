import template from './index.html'
import API from 'api'
import COM from 'service/CommonService'
import AuthService from '@/service/AuthService'

avalon.component('classify-add', {
    template: template,
    defaults: {
      id:'classify-add',
      postData:{
        iconUrl:'',
        thumbUrl:'',
        classifyName:''
      },
      afterSave:avalon.noop,
      openInit: function ({afterSave}) {
        var ctx = this
        $("#input-fa").fileinput({
          theme: "fa",
          showUpload:false, //是否显示上传按钮
          language: 'zh', //设置语言,
          uploadUrl:'/api/classify/uploadIcon',
          showPreview :false, //是否显示预览
          dropZoneEnabled: false,
          maxFileSize: 512,
          allowedPreviewTypes : [ 'image' ],
          allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
          minImageWidth: 54, //图片的最小宽度
          minImageHeight: 54,//图片的最小高度
          maxImageWidth: 64,//图片的最大宽度
          maxImageHeight: 64,//图片的最大高度
          ajaxSettings:{
            headers: {
              Authorization:  'Bearer ' + AuthService.getToken()
            }
          }
        })
        $("#input-feng").fileinput({
          theme: "fa",
          showUpload:false, //是否显示上传按钮
          language: 'zh', //设置语言,
          uploadUrl:'/api/classify/uploadIcon',
          dropZoneEnabled: false,
          showPreview :false, //是否显示预览
          maxFileSize: 512,
          allowedPreviewTypes : [ 'image' ],
          allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
          minImageWidth: 54, //图片的最小宽度
          minImageHeight: 54,//图片的最小高度
          maxImageWidth: 64,//图片的最大宽度
          maxImageHeight: 64,//图片的最大高度
          ajaxSettings:{
            headers: {
              Authorization:  'Bearer ' + AuthService.getToken()
            }
          }
        })
        //导入文件上传完成之后的事件
        $("#input-fa").on("filebatchselected", function(event, files) {
          $(this).fileinput("upload")
        })
        $("#input-fa").on("fileuploaded", function (event, data, previewId, index) {
          ctx.postData.iconUrl = data.response.data.path
        })

        //导入文件上传完成之后的事件
        $("#input-feng").on("filebatchselected", function(event, files) {
          $(this).fileinput("upload");
        }).on("fileuploaded", function (event, data, previewId, index) {
          ctx.postData.thumbUrl = data.response.data.path
        })
        $('#'+this.id).modal('show')
        this.afterSave=afterSave
      },
      save: async function () {
        const ctx = this
        if(ctx.postData.classifyName == ''){
          COM.topAlert({message:'请输入类别名称'})
          return
        }
        if(ctx.postData.iconUrl == ''){
          COM.topAlert({message:'请选择类别图标'})
          return
        }
        if(ctx.postData.thumbUrl == ''){
          COM.topAlert({message:'请选择封面图'})
          return
        }
        const res = await API['classify'].add(data)
        if(res.success){
          $('#'+this.id).modal('hide')
          this.afterSave()
        }
        COM.topAlert({message:res.message})
      }
    }
});