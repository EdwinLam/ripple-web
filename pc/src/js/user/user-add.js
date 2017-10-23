import template from './user-add.html'
import UserApi from 'api/UserApi'

avalon.component('user-add', {
    template: template,
    defaults: {
      userName:'',
      password:'',
      openInit: function (config) {
        $('#user-add').modal('show')
      },
      save:function(){
        UserApi.add()
      }
    }
});