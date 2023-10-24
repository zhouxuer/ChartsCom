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
          title: '基础图表',
          component: () => import('../views/index.vue')
        },
        {
          path: '/comDocument',
          name: 'comDocument',
          title: '组件文档',
          component: () => import('../views/comDocument.vue')
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
          path: '/projectDemo',
          component: () => import('../layout/layout.vue'),
          title: '实际项目组件',
          name: 'projectDemo',
          hidden: false,
          children: [
            {
              path: '/projectDemo/projectDemo1',
              name: 'projectDemo1',
              title: '实际项目组件1',
              component: () => import('../views/projectDemo/projectDemo1.vue')
            },
            {
              path: '/projectDemo/projectDemo2',
              name: 'projectDemo2',
              title: '实际项目组件2',
              component: () => import('../views/projectDemo/projectDemo2.vue')
            },
            {
              path: '/projectDemo/projectDemo3',
              name: 'projectDemo3',
              title: '实际项目组件3',
              component: () => import('../views/projectDemo/projectDemo3.vue')
            }
          ]
        },
        {
          path: '/Three3D',
          component: () => import('../layout/layout.vue'),
          title: 'Three3D',
          name: 'Three3D',
          hidden: false,
          children: [
            {
              path: '/Three3D/map',
              name: 'map',
              title: '3D地图',
              component: () => import('../views/Three3D/map.vue')
            },
            {
              path: '/Three3D/structure',
              name: 'structure',
              title: '3D建筑',
              component: () => import('../views/Three3D/structure.vue')
            }
          ]
        },
        {
          path: '/openLayers',
          name: 'openLayers',
          title: 'openLayers',
          component: () => import('../views/openLayers.vue')
        }
      ]
    }
  ]
}

