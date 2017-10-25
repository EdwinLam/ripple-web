import RoleApi from 'api/RoleApi'
import './role-add'
import './role-edit'
import CommonUtil from 'utils/CommonUtil'


const vm = avalon.define({
  $id: 'roleIndexVm',
  roleItems:[],
  currentPage:1,
  totalPages:1,
  totalRecord:1,
  pageSize:10,
  init: function () {
    vm.query(1)
  },
  openAdd:function(){
    avalon.vmodels['roleAdd'].openInit({afterSave:function(){
      vm.query(1)
    }})
  },
  openEdit:function(el){
    avalon.vmodels['roleEdit'].openInit({afterSave:function(){
      vm.query(1)
    },el:el})
  },
  query: async function (currentPage) {
    const res = await RoleApi.queryPage({pageNo: currentPage, pageSize: 10})
    console.log(res)

    vm.roleItems = res.data.rows
    vm.currentPage = currentPage
    vm.totalRecord = res.data.count
    vm.totalPages = Math.ceil(vm.totalRecord / vm.pageSize)
  },
  destroy:async function(el){
    CommonUtil.confirm({message:'是否删除该用户',afterConfirm: async function () {
      const res = await RoleApi.destroy(el.id)
      console.log(res)
      vm.query(1)
    }})
  }
})
module.exports = vm