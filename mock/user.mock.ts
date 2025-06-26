import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/api/login',
    method: 'POST',
    body: {
      code: 10000,
      message: '登陆成功！',
      data: {
        token: '1234567890',
      },
    },
  },
  {
    url: '/api/getUserInfo',
    method: 'GET',
    body: {
      code: 10000,
      message: '',
      data: {
        username: '佚名',
        usercode: 'admin',
      },
    },
  },
  {
    url: '/api/logout',
    method: 'POST',
    body: {
      code: 10000,
      message: '退出成功',
      data: null,
    },
  },
])
