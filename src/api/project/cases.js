import request from '@/utils/request'

export function getList(data) {
  console.log(data)
  return request({
    url: '/project/getCases',
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

export function doDelete(data) {
  return request({
    url: '/project/CaseDel',
    method: 'delete',
    data,
  })
}

export function InNewCase(data) {
  return request({
    url: '/project/InNewCase',
    method: 'post',
    data,
  })
}

export function CopyCase(data) {
  return request({
    url: '/project/CopyCase',
    method: 'post',
    data,
  })
}    

export function SmallCase(data) {
  return request({
    url: '/project/SmallCase',
    method: 'post',
    data,
  })
}

export function SmallList(data) {
  return request({
    url: '/project/SmallList',
    method: 'post',
    data,
  })
}

export function SmallDel(data) {
  return request({
    url: '/project/SmallDel',
    method: 'delete',
    data,
  })
}

export function SmallGet(data) {
  return request({
    url: '/project/SmallGet',
    method: 'post',
    data,
  })
}

export function SmallOrder(data) {
  return request({
    url: '/project/SmallOrder',
    method: 'post',
    data,
  })
}

export function LookReport(data) {
  return request({
    url: '/project/LookReport',
    method: 'post',
    data,
  })
}

export function RunCase(data) {
  return request({
    url: '/project/RunCase',
    method: 'post',
    data,
  })
}