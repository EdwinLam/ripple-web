import axios from 'axios'
import authUtil from 'utils/authUtil'
import commonUtil from 'utils/commonUtil'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  commonUtil.openLoading()
  // Do something before request is sent
  if (authUtil.getToken()) {
    config.headers['Authorization'] =  'Bearer ' + authUtil.getToken()
  }
  return config
}, error => {
  commonUtil.closeLoading()
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    commonUtil.closeLoading()
    return response.data
  },
  error => {
    commonUtil.closeLoading()
    return Promise.reject(error)
  }
)

export default service