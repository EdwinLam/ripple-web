import template from './index.html'
import API from 'api'
import COM from 'service/CommonService'
import AuthService from '@/service/AuthService'

avalon.component('classify-add', {
    template: template,
    defaults: {
      id:'classify-add',
      userName:'',
      phone:'',
      password:'',
      afterSave:avalon.noop,
      openInit: function ({afterSave}) {
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
          $(this).fileinput("upload");
        }).on("fileuploaded", function (event, data, previewId, index) {
          console.log('ok')
        })

        //导入文件上传完成之后的事件
        $("#input-feng").on("filebatchselected", function(event, files) {
          $(this).fileinput("upload");
        }).on("fileuploaded", function (event, data, previewId, index) {
          console.log('ok')
        })
        $('#'+this.id).modal('show')
        this.afterSave=afterSave
      },
      save: async function () {
        const data = {
          userName: this.userName,
          phone: this.phone,
          password: this.password
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