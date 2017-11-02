import HttpResource from '../helpers/HttpResource'

export default {
  banner:new HttpResource('/banners/:id', {id: '@id'}).init(),
  good:new HttpResource('/goods/:id', {id: '@id'}).init(),
  classify:new HttpResource('/classifies/:id', {id: '@id'}).init(),
  address:new HttpResource('/addresses/:id', {id: '@id'}).init(),
}