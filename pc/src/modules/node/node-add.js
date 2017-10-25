import template from './node-add.html'
import NodeApi from 'api/NodeApi'
import CommonUtil from 'utils/CommonUtil'

avalon.component('node-add', {
    template: template,
    defaults: {
      nodeName:'',
      nodeId:0,
      level:0,
      path:'',
      sort:1,
      moduleItems:[],
      selectedModule:{},
      afterSave:avalon.noop,
      resetParam:function(){
        this.selectedModule={}
        this.moduleItems=[]
        this.path=''
        this.level=0
        this.nodeId=0
        this.nodeName=''
        this.sort=1
      },
      openInit: async function ({afterSave}) {
        this.resetParam()
        const res = await NodeApi.getAllModules()
        this.moduleItems = res.data
        $('#node-add').modal('show')
        this.afterSave = afterSave
      },
      save: async function () {
        const data = {
          nodeName: this.nodeName,
          path:this.path,
          level:this.level,
          nodeId:this.selectedModule.id?this.selectedModule.id:null,
          sort:this.sort
        }
        const res = await NodeApi.add(data)
        if(res.success){
          $('#node-add').modal('hide')
          this.afterSave()
        }
        CommonUtil.alert({message:res.message})
      },
      getModuleName:function(){
        return !this.moduleItems.length?'暂无可选模块':
          this.selectedModule.nodeName?this.selectedModule.nodeName:'请选择模块'
      }
    }
})
