import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/login_action',
    // url: '/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(Authorization) {
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: Authorization,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register(data) {
  return request({
    url: '/user/NewUser',
    method: 'post',
    data,
  })
}
