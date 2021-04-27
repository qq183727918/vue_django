import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/project/getList',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/project/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/project/del',
    method: 'delete',
    data,
  })
}

export function GetProList(data) {
  return request({
    url: '/project/GetProList',
    method: 'post',
    data,
  })
}