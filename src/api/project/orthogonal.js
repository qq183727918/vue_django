import request from '@/utils/request'

export function Orthogonal(data) {
  console.log(data)
  return request({
    url: '/apis/Orthogonal',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/project/CaseEdit',
    method: 'put',
    data,
  })
}
