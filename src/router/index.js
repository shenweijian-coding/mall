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
    path: '/:pathMatch(.*)',
    redirect: '/404',
    hidden: true,
  },
  {
    path: '/',
    redirect: '/user',
    hidden: true,
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: {
      title: '用户管理',
    },
    children: [
      {
        path: 'list',
        name: 'user-list',
        component: () => import('@/views/user/list'),
        meta: {
          title: '用户列表',
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
        name: 'distribut-list',
        component: () => import('@/views/distribut/list'),
        meta: {
          title: '分销商列表',
        },
      },
      {
        path: 'grade',
        name: 'distribut-grade',
        component: () => import('@/views/distribut/grade'),
        meta: {
          title: '分销商等级',
        },
      },
      {
        path: 'good',
        name: 'distribut-good',
        component: () => import('@/views/distribut/good'),
        meta: {
          title: '分销商品',
        },
      },
      {
        path: 'order',
        name: 'distribut-order',
        component: () => import('@/views/distribut/order'),
        meta: {
          title: '分销订单',
        },
      },
      {
        path: 'withdraw',
        name: 'distribut-withdraw',
        component: () => import('@/views/distribut/withdraw'),
        meta: {
          title: '提现管理',
        },
      },
      {
        path: 'config',
        name: 'distribut-config',
        component: () => import('@/views/distribut/config'),
        meta: {
          title: '分销设置',
        },
      },
    ],
  },
  {
    path: '/sell',
    component: Layout,
    redirect: '/sell/list',
    meta: {
      title: '经销管理',
    },
    children: [
      {
        path: 'list',
        name: 'sell-list',
        component: () => import('@/views/sell/list'),
        meta: {
          title: '经销商列表',
        },
      },
      {
        path: 'grade',
        name: 'sell-grade',
        component: () => import('@/views/sell/grade'),
        meta: {
          title: '经销商等级',
        },
      },
      {
        path: 'good',
        name: 'sell-good',
        component: () => import('@/views/sell/good'),
        meta: {
          title: '经销商品',
        },
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
