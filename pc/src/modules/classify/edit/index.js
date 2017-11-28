import template from './index.html'
import API from 'api'
import COM from 'service/CommonService'
import 'components/upload'

avalon.component('classify-edit', {
  template: template,
  defaults: {
    modalId: 'classify-edit',
    iconFileInputConfig:{},
    thumbFileInputConfig:{},
    iconFileItems:[],
    thumbItems:[],
    postData: {
      iconUrl: '',
      thumbUrl: '',
      classifyName: '',
      remark: ''
    },
    afterSave: avalon.noop,
    openInit: function ({afterSave,el}) {
      this.postData = el
      console.log( this.postData)
      $('#' + this.modalId).modal('show')
      this.afterSave = afterSave
    },
    afterIconSelected: function (data) {
      this.postData.iconUrl = data.path
    },
    afterThumbSelected: function (data) {
      this.postData.thumbUrl = data.path
    },
    save: async function () {
      const ctx = this
      if (ctx.postData.classifyName == '') {
        COM.topAlert({message: '请输入类别名称'})
        return
      }
      if (ctx.postData.iconUrl == '') {
        COM.topAlert({message: '请选择类别图标'})
        return
      }
      if (ctx.postData.thumbUrl == '') {
        COM.topAlert({message: '请选择封面图'})
        return
      }
      const res = await API[API.KEY.CLASSIFY].update(ctx.postData)
      if (res.success) {
        $('#' + this.id).modal('hide')
        this.afterSave()
      }
      COM.topAlert({message: res.message})
    }
  }
});