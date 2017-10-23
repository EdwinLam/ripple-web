import UserApi from 'api/UserApi'
import './user-add'

const vm = avalon.define({
  $id: 'userIndexVm',
  gg:'test',
  init: function () {
    vm.query()
  },
  openAdd:function(){
    avalon.vmodels['userAdd'].openInit()
  },
  query: async function () {
    const res = await UserApi.queryPage({pageNo: 1, pageSize: 10})
    console.log(res)
  }
})
module.exports = vm