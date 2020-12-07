import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// 创建实例
const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
});
//   请求拦截
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 响应拦截
service.interceptors.response.use(function (response) {
    let res = response.data
    // 对响应数据做点什么
    if (res.code === 2000) {
        return res.data;
    }
    else{
        Message({
          message: res.msg || '请求错误',
          type: 'error',
          duration: 5 * 1000
        })
      }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default service;