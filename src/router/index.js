import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/login/login.vue'
import ProjectList from '../views/project/project_list.vue'
import ProjectApis from '../views/project/project_apis.vue'
import ProjectCase from '../views/project/project_case.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/project/list',
      name: '项目列表',
      component: ProjectList
    },
    {
      path: '/project/apis',
      name: '接口管理',
      component: ProjectApis
    },
    {
      path: '/project/case',
      name: '用例管理',
      component: ProjectCase
    },
    {
      path: '/index',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    }
  ]
})

export default router
