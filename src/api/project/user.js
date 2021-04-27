import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/user/usergetlist',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/user/userEdit',
    method: 'put',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/user/userDisable',
    method: 'put',
    data,
  })
}

export function NewUser(data) {
  return request({
    url: '/user/NewUser',
    method: 'post',
    data,
  })
}
