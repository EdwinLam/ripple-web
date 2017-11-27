import API from 'api'
import COM from 'service/CommonService'
import './add'
import './edit'

const vm = avalon.define({
  $id: 'classifyIndexVm',
  dataItems:[],
  currentPage:1,
  totalPages:1,
  totalRecord:1,
  pageSize:10,
  init: function () {
    vm.query(1)
  },
  openAdd:function(){
    avalon.vmodels['classifyAdd'].openInit({afterSave:function(){
      vm.query(1)
    }})
  },
  openEdit:function(el){
    avalon.vmodels['classifyEdit'].openInit({afterSave:function(){
      vm.query(1)
    },el:el})
  },
  query: async function (currentPage) {
    const res = await API[API.KEY.CLASSIFY].list({pageNo: currentPage, pageSize: 10})
    vm.dataItems = res.data.rows
    vm.currentPage = currentPage
    vm.totalRecord = res.data.count
    vm.totalPages = Math.ceil(vm.totalRecord / vm.pageSize)
  },
  destroy:async function(el){
    COM.confirm({message:'是否删除该数据',afterConfirm: async function () {
      const res = await API[API.KEY.CLASSIFY].destroy(el.id)
      vm.query(1)
    }})
  }
})
module.exports = vm