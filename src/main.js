import Vue from 'vue'
// import App from './App.vue'
import Home from './views/home/Home.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'babel-polyfill'

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.withCredentials = false
axios.defaults.baseURL = 'http://localhost:8080'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (store.state.token) {
    config.headers.common.Authorization = 'Bearer ' + store.state.token
  }
  return config
}, function (error) {
  router.push('/login')
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.commit('del_token')
        router.push('/login')
    }
  }
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(Home)
}).$mount('#app')
