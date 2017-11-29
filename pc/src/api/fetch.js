import axios from 'axios'
import AuthService from '@/service/AuthService'
import CommonService from '@/service/CommonService'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  CommonService.openLoading()
  // Do something before request is sent
  if (AuthService.getToken()) {
    config.headers['Authorization'] =  'Bearer ' + AuthService.getToken()
  }
  return config
}, error => {
  CommonService.closeLoading()
  Promise.reject(error)
})



// respone拦截器
service.interceptors.response.use(
  response => {
    CommonService.closeLoading()
    for(let key in response.data){

    }
    return response.data
  },
  error => {
    CommonService.closeLoading()
    return Promise.reject(error)
  }
)

export default service