export default function ({get}) {
  return [
    {
      path: '/',
      component: () => import('../layout/layout.vue'),
      hidden: true,
      children: [
        {
          path: '/',
          name: 'index',
          title: '首页',
          component: () => import('../views/index.vue')
        },
        {
          path: '/comDocument',
          name: 'comDocument',
          title: '组件文档',
          component: () => import('../views/comDocument.vue')
        },
        {
          path: '/bar',
          name: 'bar',
          title: '组件过度动画',
          component: () => import('../views/bar.vue')
        },
        {
          path: '/bar2',
          name: 'bar2',
          title: '垂直柱状图2',
          component: () => import('../views/bar2.vue')
        },
        {
          path: '/bar3',
          name: 'bar3',
          title: '水平柱状图',
          component: () => import('../views/bar3.vue')
        },
        {
          path: '/ProjectDemo',
          name: 'ProjectDemo',
          title: '实际项目组件',
          component: () => import('../views/ProjectDemo.vue')
        }
      ]
    }
  ]
}

