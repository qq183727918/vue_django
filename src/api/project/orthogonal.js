import request from '@/utils/request'

export function Orthogonal(data) {
  console.log(data)
  return request({
    url: '/apis/Orthogonal',
    method: 'post',
    data,
  })
}

export function OrthogonalDrive(data) {
  return request({
    url: '/Orthogonal/OrthogonalDrive',
    method: 'post',
    data,
  })
}
