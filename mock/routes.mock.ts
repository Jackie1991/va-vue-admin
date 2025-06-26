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
          path: '/demo',
          component: '/views/demo/index.vue',
          meta: { title: 'Demo' },
          children: [
            {
              name: 'DemoDetail',
              path: '/demo/detail',
              component: '/views/demo/detail.vue',
              meta: { title: 'Demo详情' },
            },
          ],
        },
      ],
    },
  },
])
