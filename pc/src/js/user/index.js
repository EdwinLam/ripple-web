import UserApi from 'api/UserApi'
import './user-add'
import './user-edit'
import CommonUtil from 'utils/CommonUtil'
import 'components/pagination.js'


const vm = avalon.define({
  $id: 'userIndexVm',
  userItems:[],
  currentPage:1,
  totalPages:1,
  totalRecord:1,
  pageSize:10,
  init: function () {
    vm.query(1)
  },
  openAdd:function(){
    avalon.vmodels['userAdd'].openInit({afterSave:function(){
      vm.query(1)
    }})
  },
  openEdit:function(el){
    avalon.vmodels['userEdit'].openInit({afterSave:function(){
      vm.query(1)
    },el:el})
  },
  query: async function (currentPage) {
    const res = await UserApi.queryPage({pageNo: currentPage, pageSize: 10})
    vm.userItems = res.data.rows
    vm.currentPage = currentPage
    vm.totalRecord = res.data.count
    vm.totalPages = Math.ceil(vm.totalRecord / vm.pageSize)
    console.log(res)
  },
  destroy:async function(el){
    CommonUtil.confirm({message:'是否删除该用户',afterConfirm: async function () {
      const res = await UserApi.destroy(el.id)
      console.log(res)
      vm.query(1)
    }})
  }
})
module.exports = vm