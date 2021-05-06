import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/httprunner/RunnerSee',
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
    url: '/httprunner/del',
    method: 'delete',
    data,
  })
}

export function Uncompress(data) {
  return request({
    url: '/httprunner/Uncompress',
    method: 'put',
    data,
  })
}

export function IsJSon(data) {
  return request({
    url: '/httprunner/IsJSon',
    method: 'put',
    data,
  })
}

export function LookReport(data) {
  return request({
    url: '/httprunner/RunnerLook',
    method: 'post',
    data,
  })
}

export function HttpRunner(data) {
  return request({
    url: '/httprunner/HttpRunnerReport',
    method: 'post',
    data,
  })
}