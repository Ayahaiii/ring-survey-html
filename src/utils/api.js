import http from './axios'

const login = (params) => {
  return http({
    url: '',
    method: 'post',
    data: params
  })
}

export default {
  login
}
