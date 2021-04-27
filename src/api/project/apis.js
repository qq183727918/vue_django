import request from '@/utils/request'

export function getList(data) {
  console.log(data)
  return request({
    url: '/project/getApis',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/project/DesEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/project/APisdel',
    method: 'delete',
    data,
  })
}

export function inapis(data) {
  return request({
    url: '/project/innewApis',
    method: 'delete',
    data,
  })
}

export function copyApis(data) {
  return request({
    url: '/project/copyApis',
    method: 'post',
    data,
  })
}

export function SaveApis(data) {
  return request({
    url: '/project/SaveApis',
    method: 'post',
    data,
  })
}

export function DebugApis(data) {
  return request({
    url: '/project/DebugApis',
    method: 'post',
    data,
  })
}

export function sendRequest(data) {
  return request({
    url: '/project/SendRequest',
    method: 'post',
    data,
  })
}

export function Returned(data) {
  return request({
    url: '/project/Returned',
    method: 'post',
    data,
  })
}

export function ErrorPlay(data) {
  return request({
    url: '/apis/ErrorPlay',
    method: 'post',
    data,
  })
}