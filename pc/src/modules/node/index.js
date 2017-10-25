import NodeApi from 'api/NodeApi'
import './node-add'
import './node-edit'
import CommonService from 'service/CommonService'
avalon.filters.parseLevelName=function(val){
  return val===0?'模块':'功能'
}

const vm = avalon.define({
  $id: 'nodeIndexVm',
  nodeItems:[],
  level:0,
  currentPage:1,
  totalPages:1,
  totalRecord:1,
  pageSize:10,
  init: function () {
    vm.query(1)
  },
  openAdd:function(){
    avalon.vmodels['nodeAdd'].openInit({afterSave:function(){
      vm.query(1)
    }})
  },
  openEdit:function(el){
    avalon.vmodels['nodeEdit'].openInit({afterSave:function(){
      vm.query(1)
    },el:el})
  },
  query: async function (currentPage) {
    const res = await NodeApi.queryPage({pageNo: currentPage, pageSize: 10})
    vm.nodeItems = res.data.rows
    vm.currentPage = currentPage
    vm.totalRecord = res.data.count
    vm.totalPages = Math.ceil(vm.totalRecord / vm.pageSize)
  },
  destroy:async function(el){
    CommonService.confirm({message:'是否删除该用户',afterConfirm: async function () {
      const res = await NodeApi.destroy(el.id)
      vm.query(1)
    }})
  }
})

module.exports = vm