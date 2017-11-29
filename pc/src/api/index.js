import UserApi from './UserApi'
import BaseApi from './BaseApi'
import FileApi from './FileApi'
import GoodApi from './GoodApi'

const KEY ={
  USER: Symbol.for('USER'),
  CLASSIFY: Symbol.for('CLASSIFY'),
  FILE:Symbol.for('FILE'),
  GOOD:Symbol.for('GOOD')
}
export default {
   KEY,
  [KEY.USER]:new UserApi(),
  [KEY.CLASSIFY]:new BaseApi('classify'),
  [KEY.FILE]:new FileApi(),
  [KEY.GOOD]:new GoodApi()
}