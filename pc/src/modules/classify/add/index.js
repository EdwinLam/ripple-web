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
    coverFileInputConfig:{
    },
    iconFileItems:[],
    coverFileItems:[],
    postData: {
      classifyName: '',
      remark: '',
      iconId:'',
      coverId:''
    },
    afterSave: avalon.noop,
    openInit: function ({afterSave}) {
      this.iconFileItems=[]
      this.coverFileItems=[]
      this.postData = {
        iconId: '',
        coverId: '',
        classifyName: '',
        remark: ''
      }
      $('#' + this.modalId).modal('show')
      this.afterSave = afterSave
    },
    afterIconSelected: function (data) {
      console.log(data)
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
      const res = await API[API.KEY.CLASSIFY].add(ctx.postData)
      if (res.success) {
        $('#' + this.modalId).modal('hide')
        this.afterSave()
      }
      COM.topAlert({message: res.message})
    }
  }
});