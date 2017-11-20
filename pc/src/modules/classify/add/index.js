import template from './index.html'
import API from 'api'
import COM from 'service/CommonService'

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
          language: 'zh', //设置语言,
          uploadUrl:'/api/classify/uploadIcon',
          ajaxSettings:{
            beforeSend:function(xhr){
              console.log("ok")
            }
          }
        });
        //导入文件上传完成之后的事件
        $("#input-fa").on("fileuploaded", function (event, data, previewId, index) {
          console.log('ok')
        })
        $('#input-fa').on('filebatchpreupload', function(event, data, previewId, index) {
          var form = data.form, files = data.files, extra = data.extra,
            response = data.response, reader = data.reader
          data.jqXHR=function(res){
            console.log(res)
          }
          console.log(data)
          console.log('File batch pre upload');
        });

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