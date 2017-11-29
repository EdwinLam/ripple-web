import template from './index.html'
import API from 'api'
import COM from 'service/CommonService'
import 'components/upload'

avalon.component('good-edit', {
  template: template,
  defaults: {
    modalId: 'classify-edit',
    iconFileInputConfig:{},
    coverFileInputConfig:{},
    iconFileItems:[],
    coverFileItems:[],
    postData: {
      iconId: '',
      coverId: '',
      classifyName: '',
      remark: ''
    },
    afterSave: avalon.noop,
    openInit: function ({afterSave,el}) {
      this.iconFileItems=[]
      this.coverFileItems=[]
      this.postData = el
      if(el.cover){
        const icon = avalon.mix({isImage:true,thumb:COM.getResUrl(el.icon.path)},el.icon)
        this.iconFileItems=[icon]
      }
      if(el.icon){
        const cover = avalon.mix({isImage:true,thumb:COM.getResUrl(el.cover.path)},el.cover)
        this.coverFileItems=[cover]
      }
      $('#' + this.modalId).modal('show')
      this.afterSave = afterSave
    },
    afterIconSelected: function (data) {
      this.postData.iconId = data.id
    },
    afterCoverSelected: function (data) {
      this.postData.coverId = data.id
    },
    save: async function () {
      const ctx = this
      if (ctx.postData.classifyName == '') {
        COM.topAlert({message: '请输入类别名称'})
        return
      }
      if (ctx.postData.iconId == '') {
        COM.topAlert({message: '请选择类别图标'})
        return
      }
      if (ctx.postData.coverId == '') {
        COM.topAlert({message: '请选择封面图'})
        return
      }
      const res = await API[API.KEY.CLASSIFY].update(ctx.postData)
      if (res.success) {
        $('#' + this.modalId).modal('hide')
        this.afterSave()
      }
      COM.topAlert({message: res.message})
    }
  }
});