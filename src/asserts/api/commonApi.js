import axios from 'axios'
// 创造请求实例
let baseUrl = 'http://be9f0882baa5.ngrok.io'
const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(function (config) {
  console.log(config)
  if (sessionStorage.getItem('token')) {
    config.headers['token'] = sessionStorage.getItem('token')
  }
  // 拦截到请求的时候，要做的事情
  return config
}, function (error) {
  // 请求发生错误的时候，要做的事情
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(function (response) {
  // 拦截到响应的时候，要做的事情
  return response
}, function (error) {
  // 响应发生错误的时候，要做的事情
  return Promise.reject(error)
})
// 封装axios的post请求
export function postApi(url, params) {
  return new Promise((resolve, reject) => {
    service.post(baseUrl + url, params).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}
// 封装axios的get请求
export function getApi(url, params) {
  return new Promise((resolve, reject) => {
    service.get(baseUrl + url, { params: params }).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}
export default {
  postApi(url, params) {
    return postApi(url, params);
  },
  getApi(url, params) {
    return getApi(url, params);
  }
};