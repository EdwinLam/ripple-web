import HttpResource from '../helpers/HttpResource'

export default {
  banner:new HttpResource('/banner/:id', {id: '@id'}).init(),
  good:new HttpResource('/good/:id', {id: '@id'}).init(),
  classify:new HttpResource('/classify/:id', {id: '@id'}).init(),
  address:new HttpResource('/address/:id', {id: '@id'}).init(),
  order:new HttpResource('/order/:id', {id: '@id'}).init(),
}