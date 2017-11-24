import UserApi from './UserApi'
import BaseApi from './BaseApi'
import FileApi from './FileApi'
const KEY ={
  USER: Symbol.for('USER'),
  CLASSIFY: Symbol.for('CLASSIFY'),
  FILE:Symbol.for('FILE')
}
export default {
   KEY,
  [KEY.USER]:new UserApi(),
  [KEY.CLASSIFY]:new BaseApi('classify'),
  [KEY.FILE]:new FileApi()
}