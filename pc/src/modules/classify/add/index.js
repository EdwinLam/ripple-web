import template from './index.html'
import API from 'api'
import COM from 'service/CommonService'
import 'components/upload'

avalon.component('classify-add', {
  template: template,
  defaults: {
    modalId: 'classify-add',
    iconFileInputConfig:{
    },
    thumbFileInputConfig:{
    },
    iconFileItems:[],
    thumbItems:[],
    postData: {
      iconUrl: '',
      thumbUrl: '',
      classifyName: '',
      remark: ''
    },
    afterSave: avalon.noop,
    openInit: function ({afterSave}) {
      this.postData = {
        iconUrl: '',
        thumbUrl: '',
        classifyName: '',
        remark: ''
      }
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
      const res = await API[API.KEY.CLASSIFY].add(ctx.postData)
      if (res.success) {
        $('#' + this.id).modal('hide')
        this.afterSave()
      }
      COM.topAlert({message: res.message})
    }
  }
});