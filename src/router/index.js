import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 需要显示导航的跳转路由
    path: '/index',
    name: '首页',
    // 需要显示的菜单导航的路由，作为该路由的子路由，并且在子路由中设置具体跳转加载的组件
    component: () => import('@/views/home/Home.vue'),
    children: [{
      path: '/project/list',
      name: '项目列表',
      component: () => import('@/views/project/project_list.vue')
    },
    {
      path: '/project/apis',
      name: '接口管理',
      component: () => import('@/views/project/project_apis.vue')
    },
    {
      path: '/project/case',
      name: '用例管理',
      component: () => import('@/views/project/project_case.vue')
    },
    {
      path: '/global/data',
      name: '全局变量',
      component: () => import('@/views/global/global_data.vue')
    },
    {
      path: '/user/user',
      name: '用户管理',
      component: () => import('@/views/user/user.vue')
    },
    {
      path: '/quadrature',
      name: '正交页面',
      component: () => import('../views/tools/quadrature.vue')
    }
    ]
  },
  // 不需要显示导航的路由
  {
    path: '/login',
    name: '登录页面',
    component: () => import('../views/login/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
