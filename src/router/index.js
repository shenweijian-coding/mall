import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/vab',
    component: Layout,
    redirect: '/vab/table',
    // alwaysShow: true,
    meta: {
      title: '组件',
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/vab/table'),
        meta: {
          title: '表格',
        },
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('@/views/vab/icon'),
        meta: {
          title: '图标',
        },
      },
    ],
  },
  {
    path: '/distribut',
    component: Layout,
    redirect: '/distribut/list',
    meta: {
      title: '分销管理',
    },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/distribut/list'),
        meta: {
          title: '分销商列表',
        },
      },
      {
        path: 'grade',
        name: 'Grade',
        component: () => import('@/views/distribut/grade'),
        meta: {
          title: '分销商等级',
        },
      },
      {
        path: 'good',
        name: 'Good',
        component: () => import('@/views/distribut/good'),
        meta: {
          title: '分销商品',
        },
      },
    ],
  },
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //       },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
