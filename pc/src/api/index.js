import UserApi from './UserApi'
import ClassifyApi from './UserApi'
import BaseApi from './BaseApi'

export default {
  'user':new UserApi(),
  'classify':new BaseApi('classify')
}