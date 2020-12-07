import request from '@/utils/request'
// 定位设备管理
// 显示
export function tableShow(params) {
    return request({
      url: '/equipment/equPage',
      method: 'get',
      params
    })
  }
//   添加
export function tableAdd(params) {
    return request({
      url: '/equipment/addEqu',
      method: 'post',
      data:params
    })
  }
  //   修改
export function tableUpdate(params) {
  return request({
    url: '/equipment/updateEqu',
    method: 'post',
    data:params
  })
}
 //   删除
 export function tableDelete(params) {
  return request({
    url: '/equipment/deleteEqu',
    method: 'post',
    data:params
  })
}
