import axios from 'axios'
// 创建axios实例
const http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

// request拦截器
http.interceptors.request.use(
  config => {
    // if (['post', 'put'].indexOf(config.method.toLocaleLowerCase()) > -1 && config.data) {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //   var fd = new FormData()
    //   Object.keys(config.data).forEach(key => {
    //     fd.append(key, config.data[key])
    //   })
    //   config.data = fd
    // }

    return config
  },
  error => {
    return error
  }
)

// respone拦截器
http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error)
    // return false
  }
)

export default http
