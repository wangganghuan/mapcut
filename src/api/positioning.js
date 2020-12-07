import request from '@/utils/request'
// 定位路线管理
// 添加定位路线
export function positioningAdd(params) {
    return request({
      url: '/pipe/addPipe',
      method: 'post',
      data:params
    })
  }
// 显示定位路线
  export function positioningShow() {
    return request({
      url: '/pipe/pipeList',
      method: 'get',
    })
  }
// 删除定位路线
export function positioningDelete(params) {
    return request({
      url: '/pipe/deletePipe',
      method: 'post',
      data:params
    })
  }
// 添加线
export function positioningAddRoute(params) {
  return request({
    url: '/pipe/addRoute',
    method: 'post',
    data:params
  })
} 
// 删除线
export function positioningDeleteRoute(params) {
  return request({
    url: '/pipe/deleteRoute',
    method: 'post',
    data:params
  })
}  
// 修改线
export function positioningUpdateRoute(params) {
  return request({
    url: '/pipe/updateRoute',
    method: 'post',
    data:params
  })
} 
// 回显点
export function positioningGetAPs(params) {
  return request({
    url: '/pipe/getAPs',
    method: 'get',
    params
  })
} 


// 添加点位
export function positioningbindAP(params) {
  return request({
    url: '/pipe/bindAP',
    method: 'post',
    data:params
  })
} 




  