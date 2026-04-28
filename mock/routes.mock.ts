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
          name: 'System',
          path: '/',
          meta: {
            title: '系统管理',
          },
          children: [
            {
              name: 'SystemMenu',
              path: '/system/MenuView',
              meta: { title: '菜单管理' },
            },
            {
              name: 'SystemRole',
              path: '/system/RoleView',
              meta: { title: '角色管理' },
            },
            {
              name: 'SystemUser',
              path: '/system/UserView',
              meta: { title: '用户管理' },
            },
          ],
        },
        {
          name: 'Activity',
          path: '/',
          meta: {
            title: '活动管理',
            levelHidden: true,
          },
          children: [
            {
              name: 'ActivityHome',
              path: '/activity',
              meta: { title: '活动管理' },
            },
            {
              name: 'ActivityDetail',
              path: '/activity/detail',
              meta: {
                title: '活动详情',
                hidden: true,
              },
            },
          ],
        },
        {
          path: '/web',
          name: 'Web',
          meta: {
            title: '门户网站',
            target: '_blank',
          },
        },
      ],
    },
  },
])
