import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/global/VariAble',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/global/DoEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/global/GloDel',
    method: 'delete',
    data,
  })
}
