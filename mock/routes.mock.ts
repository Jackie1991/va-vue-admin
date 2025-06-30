import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/api/routes',
    method: 'GET',
    body: {
      code: 10000,
      message: '成功！',
      data: [
        {
          name: 'Demo',
          path: '/',
          meta: { title: 'Demo' },
          children: [
            {
              name: 'DemoHome',
              path: '/demo',
              meta: { title: 'Demo' },
            },
            {
              name: 'DemoDetail',
              path: '/demo/detail',
              meta: { title: 'Demo详情' },
            },
          ],
        },
        {
          path: '/web',
          name: 'Web',
          meta: {
            title: '门户',
            target: '_blank',
          },
        },
      ],
    },
  },
])
