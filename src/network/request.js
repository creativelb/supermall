import axios from 'axios'
let instance1 = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/m5/',
  timeout: 3000
})

// request1 向 http://152.136.185.210:7878/api/m5 发送请求
export function request1(config) {
  let { url, method, params, data } = config;
  return instance1({
    url,
    method,
    params,
    data
  })
}