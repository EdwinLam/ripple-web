import WxRequest from '../assets/plugins/wx-request/lib/index'

export default class HttpService extends WxRequest {
	constructor(options) {
		super(options)
    this.interceptors.use({
            request(request) {
            	request.header = request.header || {}
            	request.header['content-type'] = 'application/json'
                if (request.url.indexOf('/api') !== -1 && wx.getStorageSync('token')) {
                    request.header.Authorization = 'Bearer ' + wx.getStorageSync('token')
                }
                // wx.showLoading({
                //     title: '加载中',
                // })
                return request
            },
            requestError(requestError) {
            	// wx.hideLoading()
                return Promise.reject(requestError)
            },
            response(response) {
            	// wx.hideLoading()
            	if(response.statusCode === 401) {
                    wx.removeStorageSync('token')
                    wx.redirectTo({
                        url: '/pages/login/index'
                    })
                }
                return response.data
            },
            responseError(responseError) {
            	// wx.hideLoading()
                return Promise.reject(responseError)
            },
        })
	}
}